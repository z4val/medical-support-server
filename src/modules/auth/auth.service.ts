import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/domain/user/entities/user.entity';
import { stat } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);
    try {
      if (!user)
        throw new NotFoundException({
          statusCode: 404,
          error: 'User not found',
          message: 'No user found with the provided email',
        });

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch)
        throw new UnauthorizedException({
          statusCode: 401,
          error: 'Invalid credentials',
          message: 'The provided password is incorrect',
        });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: 'User validation failed',
        message: 'An error occurred during user validation',
      });
    }
  }

  async register(userData: RegisterDto) {
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'User with this email already exists',
        message: 'Registration failed',
      });
    }
    const { password, ...newUser } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const dto = { ...newUser, password: hashedPassword };
    const createdUser = await this.userService.create(dto);
    if (!createdUser) {
      throw new InternalServerErrorException({
        statusCode: 500,
        error: 'User creation failed',
        message: 'Registration failed',
      });
    }
    return {
      statusCode: 201,
      message: 'User registered successfully',
    };
  }

  async login(userCredentials: LoginDto) {
    const { email, password } = userCredentials;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Invalid credentials',
        message: 'Login failed',
      });
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      statusCode: 200,
      message: 'Login successful',
      accessToken: token,
    };
  }
}
