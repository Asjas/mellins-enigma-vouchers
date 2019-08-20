import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  createVoucher(@Body() createVoucherDto: CreateVoucherDto): Voucher {
    return this.voucherService.createVoucher(createVoucherDto);
  }
}
