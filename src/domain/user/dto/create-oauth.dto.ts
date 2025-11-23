import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOauthUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  password?: string;
}
