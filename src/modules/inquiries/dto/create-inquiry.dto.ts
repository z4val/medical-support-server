import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { PatientState, TypeDiagnosis } from '../entities/inquiry.entity';

const TYPE_DIAGNOSIS_VALUES: TypeDiagnosis[] = [
  'normal',
  'chatgpt',
  'deepseek',
] as const;

const PATIENT_STATE_VALUES: PatientState[] = [
  'stable',
  'in_treatment',
  'critical',
] as const;

class InquiryIndicatorInput {
  @IsUUID()
  indicatorId: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
  value: number;
}

export class CreateInquiryDto {
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsEnum(TYPE_DIAGNOSIS_VALUES)
  type_diagnosis: TypeDiagnosis;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  @IsEnum(PATIENT_STATE_VALUES)
  patient_state: PatientState;

  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsOptional()
  @IsString()
  risk_level?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InquiryIndicatorInput)
  indicators: InquiryIndicatorInput[];

  @IsOptional()
  @IsString()
  ai_prompt?: string;

  @IsOptional()
  @IsString()
  ai_response?: string;

  @IsOptional()
  @IsNumber()
  ai_confidence?: number;
}
