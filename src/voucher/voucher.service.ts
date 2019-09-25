import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { EnigmaService } from '../enigma/enigma.service';
import { VoucherRepository } from './voucher.repository';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaDto } from '../enigma/dto/enigma.dto';
import { fourwaysPrecinctLaunch } from '../templates/fourwaysPrecinctLaunch';
import { VoucherDto } from './dto/voucher.dto';
import { guessPromotion } from '../templates/guessPromotion';

@Injectable()
export class VoucherService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly voucherRepository: VoucherRepository,
    private readonly enigmaService: EnigmaService,
  ) {}

  sendEmailFourways(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;
    const parsedEmail = fourwaysPrecinctLaunch(voucherCode);

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

  sendEmailGuess(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;
    const parsedEmail = guessPromotion(voucherCode);

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

  async createEnigmaValueVoucher(
    createVoucherDto: CreateVoucherDto,
    voucher: VoucherDto,
  ): Promise<{ code: number; result: string }> {
    const date = new Date();
    const { type, value } = voucher;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: type,
      voucherAmount: value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    const matchedVoucherType = foundUser.enigmaVouchers.map(
      voucher => voucher.voucherType === enigmaVoucher.voucherType,
    );

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType[0]) {
      return {
        code: 203,
        result: 'A voucher for this email address has already been created and emailed.',
      };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    const enigmaResult = await this.enigmaService
      .createEnigmaValueVoucher(createVoucherDto, voucher)
      .then((response: any) => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        this.sendEmailFourways(createVoucherDto, enigmaVoucher);

        return {
          code: 201,
          result: 'Voucher has been sent to your email address.',
        };
      })
      .catch(err => {
        if (err) {
          console.log(err);
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

    return enigmaResult;
  }

  async createEnigmaDiscountVoucher(
    createVoucherDto: CreateVoucherDto,
    voucher: VoucherDto,
  ): Promise<{ code: number; result: string }> {
    const date = new Date();
    const { type, value } = voucher;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: type,
      voucherDiscount: value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    const matchedVoucherType = foundUser.enigmaVouchers.map(
      voucher => voucher.voucherType === enigmaVoucher.voucherType,
    );

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType.includes(true)) {
      return {
        code: 203,
        result: 'A voucher for this email address has already been created and emailed.',
      };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    const enigmaResult = await this.enigmaService
      .createEnigmaValueVoucher(createVoucherDto, voucher)
      .then((response: any) => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        this.sendEmailGuess(createVoucherDto, enigmaVoucher);

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

    return enigmaResult;
  }
}
