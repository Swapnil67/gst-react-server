import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/typeorm/entities';
import { Repository } from 'typeorm';
import { JwtAccessPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  // Check if the user exists in DB
  async validateUser(jwtAccessPayload: JwtAccessPayload) {
    // console.log("jwt Payload ", jwtAccessPayload);  // { name: Goku, id: 1 }
    try {
      const user = await this.userRepo.findOneOrFail(jwtAccessPayload.id); // SELECT * from user WHERE user.id = id
      return user;
    } catch (error) {
      throw new Error("jwt No user found");
    }
  }

  // Get User If their is refresh Token
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User> {
    try {
      const user = await this.userRepo.findOneOrFail(userId); // SELECT * from user WHERE user.id = id
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.currentHashedRefreshToken
      );
      if (isRefreshTokenMatching) {
        return user;
      }
    } catch (error) {
      throw new Error("User found with Provided Refresh Token");
    }
  }

  // Create Access Token
  async createAccessToken(jwtAccessPayload: JwtAccessPayload) {
    const token = sign({jwtAccessPayload}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });  
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION}`;
    return { token, cookie }
  }
  
  // Create Refresh Token
  async createRefreshToken(id) {
    const rtoken = sign({id}, process.env.JWT_REFRESH_TOKEN_SECRET, 
      { 
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
      }
    );  
    const rcookie = `Refresh=${rtoken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return { rcookie, rtoken }
  }
}
