import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// Entities
import { User } from './user.entity';

@Entity()
export class EnigmaVoucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  issueDate: string;

  @Column('text')
  voucherCode: string;

  @Column('text')
  voucherType: string;

  @Column('text')
  voucherAmount: number;

  @Column('text')
  voucherDiscount: number;

  @Column('text')
  voucherBatchId: string;

  @ManyToOne(type => User, voucher => voucher.enigmaVouchers)
  user: User;
}
