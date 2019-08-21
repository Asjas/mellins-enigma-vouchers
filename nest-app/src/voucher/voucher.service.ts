import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { Voucher } from './interfaces/voucher.interface';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ConfigService } from '../config/config.service';
import { EnigmaService } from '../enigma/enigma.service';

@Injectable()
export class VoucherService {
  constructor(private readonly enigmaService: EnigmaService) {}
  private voucher;
  // getVoucherById(id: string): Voucher {
  //   return Object.entries(this.voucher).map(voucher => voucher.id === id);
  // }

  // this.enigmaService.getTenantDetail().subscribe(response => {
  // console.log(response);
  // });

  async createVoucher(createVoucherDto: CreateVoucherDto): Promise<void> {
    await this.enigmaService
      .createEnigmaVoucher(createVoucherDto)
      .subscribe(response => {
        console.log(response);
        // this.voucher = response.voucher;
      });
    // await this.mailerService
    //   .sendMail({
    //     to: email,
    //     subject: 'Mellins iStyle - Voucher',
    //     template: 'email',
    //     context: {
    //       this.voucher,
    //     },
    //   })
    //   .then(() => console.log('email sent'))
    //   .catch(error => {
    //     console.error('Error sending email: ', error.stack);
    //   });
  }
}
