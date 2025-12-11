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

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  minRegularValue: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  maxRegularValue: number;

  @OneToMany(
    () => InquiryIndicator,
    (inquiryIndicator) => inquiryIndicator.indicator,
  )
  inquiryIndicators: InquiryIndicator[];
}
