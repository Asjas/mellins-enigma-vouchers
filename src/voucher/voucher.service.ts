import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaService } from '../enigma/enigma.service';
import { VoucherRepository } from './voucher.repository';
import { EnigmaDto } from '../enigma/dto/enigma.dto';
import { mjmlEmail } from '../templates/fourwaysPrecinctLaunch';

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
      .then(() => {})
      .catch(error => {
        console.error(error);
        return 'Error sending email.';
      });
  }

  async createVoucher(createVoucherDto: CreateVoucherDto): Promise<{ code: number; result: string }> {
    const date = new Date();

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: 'PRECINCT_PROMOTION',
      voucherAmount: 2000,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    const matchedVoucherType =
      foundUser && foundUser.enigmaVouchers.map(voucher => voucher.voucherType === enigmaVoucher.voucherType);

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType) {
      return {
        code: 203,
        result: 'A voucher for this email address has already been created and emailed.',
      };
    }

    const enigmaResult = await this.enigmaService
      .createEnigmaVoucher(createVoucherDto)
      .then((response: any) => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        return {
          code: 201,
          result: 'Voucher has been sent to your email address.',
        };
      })
      .catch(err => {
        if (err) {
          const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
          const { detail } = err.response.data;

          if (voucherUnavailableRegex.test(detail)) {
            return { code: 203, result: 'No more vouchers are available.' };
          }

          if (err.response.status >= 400) {
            return { code: 400, result: 'Voucher was not created. Please try again.' };
          }
        }
      });

    if (enigmaResult.code === 201) {
      // If the voucher was created, send the email to the user
      await this.sendEmail(createVoucherDto, enigmaVoucher);
    }

    return enigmaResult;
  }
}
