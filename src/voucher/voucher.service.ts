import { Injectable, Body, Res } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaService } from '../enigma/enigma.service';
import { VoucherRepository } from './voucher.repository';
import { EnigmaDto } from 'src/enigma/dto/enigma.dto';

@Injectable()
export class VoucherService {
  constructor(
    private readonly voucherRepository: VoucherRepository,
    private readonly enigmaService: EnigmaService,
  ) {}

  async createVoucher(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<{ code: number; result: string }> {
    const foundVoucher = await this.voucherRepository.getVoucherByEmail(createVoucherDto);

    // If a voucher has been found, return a message and stop
    if (foundVoucher) {
      return {
        code: 200,
        result:
          'Voucher for this user has already been created and emailed. Please check your spam/junk folder.',
      };
    }

    return this.enigmaService
      .createEnigmaVoucher(createVoucherDto)
      .then(response => {
        console.log('response', response);

        const enigmaVoucher: EnigmaDto = {
          issueDate: Date.now().toString(),
          voucherCode: '2000',
          voucherType: 'EYE_TEST',
          voucherBatchId: '2001',
        };

        const result = this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);
        console.log('result', result);
        return {
          code: 201,
          result: 'Voucher has been created and emailed.',
        };
      })
      .catch(err => {
        const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
        const { detail } = err.response.data;

        if (voucherUnavailableRegex.test(detail)) {
          return { code: 400, result: 'No more vouchers are available.' };
        }

        if (Number(err.response.status >= 400)) {
          return { code: 400, result: 'Voucher was not created. Please try again.' };
        }
      });
  }
}
