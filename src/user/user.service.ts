import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';
import { User } from './typeorm/entities';
import { UserLoginInfo } from './typeorm/dto/UserLoginInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getDemo(@Res() res: Response) {
    return res.json({
      message: 'Working',
    });
  }

  // Login User and Set the AT and RT
  async login(
    @Res() res: Response,
    @Req() req: Request,
    body: UserLoginInfo,
  ): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: body.email } });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    console.log(user);
    // User found but check the password
    const isMatched = await bcrypt.compare(body.password, user.password);
    if (!isMatched) {
      throw new BadRequestException('Invalid Credentials');
    }
    // // Create Access Token and get the Authentication Cookie
    let jwtAccessPayload: JwtAccessPayload = { name: user.name, id: user.id };
    const { token, cookie } = await this.authService.createAccessToken(
      jwtAccessPayload,
    );
    user.token = token;
    await this.userRepo.save(user); // Save can also be used to update the user
    // Create the Refresh Token and Refresh Cookie
    let jwtRefreshPayload = { id: user.id };
    const { rcookie, rtoken } = await this.authService.createRefreshToken(
      jwtRefreshPayload,
    );
    await this.setCurrentRefreshToken(rtoken, user.id); // Update the Refresh Token
    // Set Cookies in the Header
    // res.setHeader('Set-Cookie',cookie);
    res.setHeader('Set-Cookie', [cookie, rcookie]);
    console.log(cookie, '\n', rcookie);
    return res.json({
      success: true,
      msg: 'User LoggedIn successfully',
      accessToken: token,
      refreshToken: rtoken,
    });
  }

  // Encrypt the RT and save it to DB
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(userId, {
      currentHashedRefreshToken,
    });
  }
}
