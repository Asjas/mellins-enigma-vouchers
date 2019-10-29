import { Injectable } from '@nestjs/common';

// Services
import { MailerService } from '@nest-modules/mailer/dist/mailer.service';

// Dto
import { CreateVoucherDto } from '../dto/create-voucher.dto';
import { EnigmaDto } from '../dto/enigma.dto';

// Templates
import { fourwaysPrecinctLaunch } from '../templates/fourwaysPrecinctLaunch';
import { guessPromotion } from '../templates/guessPromotion';
import { summerSalePromotion } from '../templates/summerSalePromotion';
import { emporioArmaniPromotion } from '../templates/emporioArmaniPromotion';

@Injectable()
export class VoucherMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailFourways(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
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

  async sendEmailGuess(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
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

  async sendSummerSalePromotion(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;
    const parsedEmail = summerSalePromotion(voucherCode);

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

  async sendEmporioArmaniPromotion(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto) {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;
    const parsedEmail = emporioArmaniPromotion(voucherCode);

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
}
