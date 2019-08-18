import { Controller, Body, Post } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { Voucher } from './voucher.model';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  voucher(@Body('email') email: string, @Body('param') param: string): Voucher {
    console.log(email);
    console.log(param);
    return this.voucherService.createVoucher(email, param);
  }
}
