import { InquiryIndicator } from 'src/modules/inquiries/entities/inquiry-indicator.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Indicator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  unit: string;

  @Column()
  minRegularValue: number;

  @Column()
  maxRegularValue: number;

  @OneToMany(
    () => InquiryIndicator,
    (inquiryIndicator) => inquiryIndicator.indicator,
  )
  inquiryIndicators: InquiryIndicator[];
}
