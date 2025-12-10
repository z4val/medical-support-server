import { Patient } from 'src/domain/patient/entities/patient.entity';
import { User } from 'src/domain/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InquiryIndicator } from './inquiry-indicator.entity';

export type TypeDiagnosis = 'normal' | 'chatgpt' | 'deepseek';
export type PatientState = 'stable' | 'in_treatment' | 'critical';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'chatgpt', 'deepseek'],
    default: 'normal',
  })
  type_diagnosis: TypeDiagnosis;

  @Column()
  diagnosis: string;

  @Column({
    type: 'enum',
    enum: ['stable', 'in_treatment', 'critical'],
    default: 'stable',
  })
  patient_state: PatientState;

  @Column()
  feedback: string;

  @Column({ nullable: true })
  risk_level: string;

  @Column({ nullable: true })
  ai_prompt: string;

  @Column({ nullable: true })
  ai_response: string;

  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  ai_confidence: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relationships (User and Patient)

  @ManyToOne(() => User, (user) => user.inquiries, { nullable: true })
  user?: User;

  @ManyToOne(() => Patient, (patient) => patient.inquiries, {
    nullable: false,
  })
  patient: Patient;

  @OneToMany(
    () => InquiryIndicator,
    (inquiryIndicator) => inquiryIndicator.inquiry,
    { cascade: true },
  )
  inquiryIndicators: InquiryIndicator[];
}
