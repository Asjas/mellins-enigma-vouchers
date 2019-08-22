import { Injectable, Body } from '@nestjs/common';
import { Voucher } from './interfaces/voucher.interface';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaService } from '../enigma/enigma.service';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class VoucherService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly enigmaService: EnigmaService,
  ) {}
  private email: string;

  async createVoucher(@Body() createVoucherDto: CreateVoucherDto): Promise<void> {
    await this.enigmaService.createEnigmaVoucher(createVoucherDto).subscribe(response => {
      console.log(response);
      this.email = createVoucherDto.email;
      // this.voucher = response.voucher;
    });

    await this.mailerService
      .sendMail({
        to: this.email,
        subject: 'Mellins iStyle - Voucher',
        template: 'email',
        // context: {
        //   this.voucher,
        // },
      })
      .then(() => console.log('email sent'))
      .catch(error => {
        console.error('Error sending email: ', error.stack);
      });
  }
}
