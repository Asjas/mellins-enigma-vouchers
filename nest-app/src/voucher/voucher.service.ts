import { Injectable } from '@nestjs/common';
import { Voucher } from './voucher.model';

@Injectable()
export class VoucherService {
  private voucher: Voucher = { id: '' };

  createVoucher(email: string, param: string): Voucher {
    this.voucher.id = '2000';
    console.log(email);
    console.log(param);

    return this.voucher;
  }
}
