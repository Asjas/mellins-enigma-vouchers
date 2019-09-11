import { Controller, Body, Post, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createVoucher(createVoucherDto);

    res.status(code).send(result);
  }
}
