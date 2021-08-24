import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from 'src/user/typeorm/entities';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log("Token from R-Super: ", request.cookies.Refresh);
        return request?.cookies?.Refresh;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }
 
  async validate(request: Request, payload): Promise<User> {
    const refreshToken = request.cookies?.Refresh;
    console.log("Token From Validate", refreshToken);
    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
  }
}