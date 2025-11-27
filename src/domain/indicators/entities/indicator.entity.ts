import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  minRegularValue: string;

  @Column()
  maxRegularValue: string;
}
