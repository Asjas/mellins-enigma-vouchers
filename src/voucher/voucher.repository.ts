import { EntityRepository, Repository } from 'typeorm';
import { Voucher } from './voucher.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@EntityRepository(Voucher)
export class VoucherRepository extends Repository<Voucher> {}
