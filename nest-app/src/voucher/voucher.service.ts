import { Injectable } from '@nestjs/common';
import { Voucher } from './interfaces/voucher.interface';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Injectable()
export class VoucherService {
  private voucher: Voucher = { id: '' };

  // getVoucherById(id: string): Voucher {
  //   return Object.entries(this.voucher).map(voucher => voucher.id === id);
  // }

  createVoucher(createVoucherDto: CreateVoucherDto): Voucher {
    const { email, param } = createVoucherDto;
    this.voucher.id = '2000';
    console.log(email);
    console.log(param);

    return this.voucher;
  }
}
