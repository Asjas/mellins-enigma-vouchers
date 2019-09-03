import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column('text')
  voucherType: string;

  @Column('int')
  voucherId: number;

  @Column()
  isCreated: boolean;
}
