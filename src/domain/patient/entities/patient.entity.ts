import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
