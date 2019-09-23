import { Controller, Body, Post, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { VoucherDto } from './dto/voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('/fourwaysprecinct')
  @UsePipes(ValidationPipe)
  async createVoucherPrecinct(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const voucher = { type: 'PRECINCT_PROMOTION', definitionId: '5d84b4dbbaaab1b6784fe62b', value: 2000 } as VoucherDto;
    const { code, result } = await this.voucherService.createEnigmaValueVoucher(createVoucherDto, voucher);

    res.status(code).send(result);
  }

  @Post('/guesspromotion')
  @UsePipes(ValidationPipe)
  async createVoucherGuess(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const voucher = {
      type: 'GUESS_PROMOTION_SEP',
      definitionId: '5d889652baaab1b67851fa61',
      discount: 100,
    } as VoucherDto;
    const { code, result } = await this.voucherService.createEnigmaDiscountVoucher(createVoucherDto, voucher);

    res.status(code).send(result);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createVoucher(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
  //   const { code, result } = await this.voucherService.createVoucher(createVoucherDto);

  //   res.status(code).send(result);
  // }
}
