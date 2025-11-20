import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '../entities/token-payload.entity';
import { UserService } from 'src/domain/user/user.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user)
      throw new UnauthorizedException({
        error: 'TOKEN_INVALID',
        message: 'The token is invalid',
      });
    return user;
  }
}
