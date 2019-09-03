import { Injectable, Body, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nest-modules/mailer';
import { Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaService } from '../enigma/enigma.service';
import { Voucher } from './voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    private readonly mailerService: MailerService,
    private readonly enigmaService: EnigmaService,
  ) {}
  private email: string;

  async getVoucherByEmail(email: string) {
    return this.voucherRepository.findOne(email);
  }

  async createVoucher(@Body() createVoucherDto: CreateVoucherDto): Promise<any> {
    this.email = createVoucherDto.email;
    const foundVoucher = await this.getVoucherByEmail(this.email);
    console.log('found voucher', foundVoucher);

    const voucher = this.enigmaService.createEnigmaVoucher$(createVoucherDto).subscribe(
      response => {
        console.log('response', response);
        return response;
        // this.voucher = response.voucher;
      },
      err => {
        return err;
      },
    );

    return voucher;

    // await this.mailerService
    //   .sendMail({
    //     to: this.email,
    //     subject: 'Mellins iStyle - Voucher',
    //     template: 'email',
    //     // context: {
    //     //   this.voucher,
    //     // },
    //   })
    //   .then(() => console.log('email sent'))
    //   .catch(error => {
    //     console.error('Error sending email: ', error.stack);
    //   });
  }
}
