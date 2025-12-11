import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const payload = { sub: user.id, email: user.email };
    const token = await this.authService.generateJwtToken(payload);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.redirect(
      `${this.configService.get<string>('FRONTEND_URL')!}/google/success`,
    );
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async me(@Req() req) {
    return req.user;
  }
}