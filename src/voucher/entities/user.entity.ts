import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Entities
import { EnigmaVoucher } from './enigma.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @OneToMany(type => EnigmaVoucher, enigma => enigma.user)
  enigmaVouchers: EnigmaVoucher[];
}
