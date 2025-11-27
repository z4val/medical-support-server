import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  birthdate: Date;

  @Column()
  gender: boolean;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.patient)
  inquiries: Inquiry[];
}
