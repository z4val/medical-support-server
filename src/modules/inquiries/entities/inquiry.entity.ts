import { Patient } from 'src/domain/patient/entities/patient.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InquiryIndicator } from './inquiry-indicator.entity';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_diagnosis: string;

  @Column()
  diagnosis: string;

  @Column()
  patient_state: string;

  @Column()
  feedback: string;

  // Relationships (User and Patient)

  @ManyToOne(() => User, (user) => user.inquiries)
  user: User;

  @ManyToOne(() => Patient, (patient) => patient.inquiries)
  patient: Patient;

  @OneToMany(
    () => InquiryIndicator,
    (inquiryIndicator) => inquiryIndicator.inquiry,
  )
  inquiryIndicators: InquiryIndicator[];
}
