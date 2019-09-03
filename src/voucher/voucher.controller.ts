import { Controller, Body, Get, Post, Param, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { Voucher } from './interfaces/voucher.interface';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // @Get('/:id')
  // getVoucherById(@Param('id') id: string): Voucher {
  //   return this.voucherService.getVoucherById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const voucher = await this.voucherService.createVoucher(createVoucherDto);
    console.log('route', voucher);
    if (!voucher) {
      res.status(401).send('Voucher was not created.');
      return;
    }

    res.status(201).send('Voucher created and emailed.');
  }
}
