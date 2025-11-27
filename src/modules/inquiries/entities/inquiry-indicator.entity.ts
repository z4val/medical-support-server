import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { Indicator } from 'src/domain/indicators/entities/indicator.entity';

@Entity()
export class InquiryIndicator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.inquiryIndicators)
  inquiry: Inquiry;

  @ManyToOne(() => Indicator, (indicator) => indicator.inquiryIndicators)
  indicator: Indicator;
}
