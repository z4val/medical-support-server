import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { Indicator } from 'src/domain/indicators/entities/indicator.entity';

@Entity()
export class InquiryIndicator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.inquiryIndicators, {
    onDelete: 'CASCADE',
  })
  inquiry: Inquiry;

  @ManyToOne(() => Indicator, (indicator) => indicator.inquiryIndicators, {
    eager: true,
  })
  indicator: Indicator;
}
