import { Controller, Body, Get, Post, Param, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // @Get('/:email')
  // async getVoucherById(@Param('id') email: string): Promise<any> {
  //   return this.voucherService.getVoucherById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createVoucher(createVoucherDto);
    console.log('route', result);

    res.status(code).send(result);
  }
}
