import { Injectable } from '@nestjs/common';
import { Voucher } from './interfaces/voucher.interface';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ConfigService } from 'src/config/config.service';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class VoucherService {
  constructor(private readonly mailerService: MailerService) {}
  // getVoucherById(id: string): Voucher {
  //   return Object.entries(this.voucher).map(voucher => voucher.id === id);
  // }

  createVoucher(createVoucherDto: CreateVoucherDto): any {
    const { email, param } = createVoucherDto;
    const voucher = 2000;
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Mellins iStyle - Voucher',
        template: 'email',
        context: {
          voucher,
        },
      })
      .then(() => console.log('email sent'))
      .catch(error => {
        console.error('Error sending email: ', error.stack);
      });
  }
}
