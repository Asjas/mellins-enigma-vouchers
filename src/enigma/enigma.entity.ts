import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../voucher/user.entity';

@Entity()
export class EnigmaVoucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  issueDate: string;

  @Column('text')
  voucherType: string;

  @Column('text')
  voucherCode: string;

  @Column('text')
  voucherBatchId: string;

  @ManyToOne(type => User, voucher => voucher.enigmaVouchers)
  user: User;
}
