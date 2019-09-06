import { Injectable, Body, Res } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaService } from '../enigma/enigma.service';
import { VoucherRepository } from './voucher.repository';
import { EnigmaDto } from 'src/enigma/dto/enigma.dto';
import { mjmlEmail } from '../templates/voucher-email';

@Injectable()
export class VoucherService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly voucherRepository: VoucherRepository,
    private readonly enigmaService: EnigmaService,
  ) {}

  async sendEmail(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;
    const parsedEmail = mjmlEmail(voucherCode);

    return this.mailerService
      .sendMail({
        to: email,
        html: parsedEmail.html,
      })
      .then(() => {
        console.log('Email sent.');
      })
      .catch(error => {
        console.error(error);
        return 'Error sending email.';
      });
  }

  async createVoucher(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<{ code: number; result: string }> {
    const date = new Date();
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: 'D340DJFKCE344243',
      voucherType: 'EYE_TEST',
      voucherBatchId: '2001',
    };

    const foundVoucher = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    console.log('found voucher', foundVoucher);

    // If a voucher has been found, return a message and stop
    if (foundVoucher) {
      return {
        code: 200,
        result:
          "Voucher for this user has already been created and emailed. Please check your spam/junk folder if you haven't received it yet.",
      };
    }

    const enigmaResult = await this.enigmaService
      .createEnigmaVoucher(createVoucherDto)
      .then(response => {
        console.log('response', response);

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

    if (enigmaResult.code === 201) {
      await this.sendEmail(createVoucherDto, enigmaVoucher);
    }

    return enigmaResult;
  }
}
