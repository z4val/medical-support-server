import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true, nullable: false })
  dni: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'boolean' })
  gender: boolean;

  @Column()
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.patient)
  inquiries: Inquiry[];
}
