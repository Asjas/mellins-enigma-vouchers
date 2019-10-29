import { Controller, Body, Post, UsePipes, ValidationPipe, Res } from '@nestjs/common';

// Services
import { VoucherService } from './voucher.service';

// Dto
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('/fourwaysprecinct')
  @UsePipes(ValidationPipe)
  async createVoucherPrecinct(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createVoucherPrecinct(createVoucherDto);

    return res.status(code).send(result);
  }

  @Post('/guesspromotion')
  @UsePipes(ValidationPipe)
  async createVoucherGuess(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createVoucherGuess(createVoucherDto);

    return res.status(code).send(result);
  }

  @Post('/summersalepromotion')
  @UsePipes(ValidationPipe)
  async createSummerSalePromotion(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createSummerSalePromotion(createVoucherDto);

    return res.status(code).send(result);
  }

  @Post('/emporioarmanipromotion')
  @UsePipes(ValidationPipe)
  async createEmporioArmaniPromotion(@Body() createVoucherDto: CreateVoucherDto, @Res() res): Promise<any> {
    const { code, result } = await this.voucherService.createEmporioArmaniPromotion(createVoucherDto);

    return res.status(code).send(result);
  }
}
