import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIndicatorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  minRegularValue: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  maxRegularValue: number;
}
