import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request, json } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access-guard';
import { JwtRefreshGuard } from 'src/auth/guards/jwt-refresh.gaurd';
import { JwtAccessPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UserLoginInfo } from './typeorm/dto/UserLoginInfo.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Post('/login')
  async login(@Res() res: Response, @Req() req: Request, @Body() body: UserLoginInfo) {
    return await this.userService.login(res, req, body);
  }

  @UseGuards(JwtAccessGuard)
  @Get('/protected')
  async getProtected(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh-access-token')
  async refreshAccessToken(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    const jwtAccessPayload: JwtAccessPayload = {
      name: req.user['name'],
      id: req.user['id'],
    };
    const { token, cookie } = await this.authService.createAccessToken(
      jwtAccessPayload,
    );
    res.setHeader('Set-Cookie', cookie);
    console.log(cookie);
    return res.json({ user: req.user });
  }

  @Get('/demo')
  async getDemo(@Res() res: Response) {
    return this.userService.getDemo(res);
  }
}
