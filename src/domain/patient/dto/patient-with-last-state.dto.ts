import { IsNotEmpty } from 'class-validator';
import { Patient } from '../entities/patient.entity';

export class PatientWithLastStateDto {
  @IsNotEmpty()
  patient: Patient;

  @IsNotEmpty()
  lastState: string;
}
