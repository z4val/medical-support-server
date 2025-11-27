import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: ['local', 'google'], default: 'local' })
  provider: string;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  //Relationships
  @OneToMany(() => Inquiry, (inquiry) => inquiry.user)
  inquiries: Inquiry[];
}
