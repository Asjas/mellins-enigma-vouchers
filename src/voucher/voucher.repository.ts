import { EntityRepository, Repository } from 'typeorm';
import { MailerService } from '@nest-modules/mailer';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaDto } from '../enigma/dto/enigma.dto';
import { User } from './user.entity';
import { EnigmaVoucher } from '../enigma/enigma.entity';

@EntityRepository(User)
export class VoucherRepository extends Repository<User> {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async sendEmail(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto): Promise<string> {
    const { email } = createVoucherDto;
    const { voucherCode } = enigmaVoucher;

    return this.mailerService
      .sendMail({
        to: email,
        subject: 'Mellins iStyle - Voucher',
        template: 'email',
        context: {
          voucherCode,
        },
      })
      .then(() => {
        return 'Email sent.';
      })
      .catch(error => {
        console.error(error);
        return 'Error sending email.';
      });
  }

  async getVoucherByEmail(createVoucherDto: CreateVoucherDto): Promise<User> {
    const { email } = createVoucherDto;
    const result = await this.findOne({ where: { email }, relations: ['enigmaVouchers'] });

    return result;
  }

  async createVoucher(
    createVoucherDto: CreateVoucherDto,
    enigmaVoucher: EnigmaDto,
  ): Promise<string> {
    const { email } = createVoucherDto;
    const { issueDate, voucherCode, voucherType, voucherBatchId } = enigmaVoucher;

    const enigma = new EnigmaVoucher();
    enigma.issueDate = issueDate;
    enigma.voucherCode = voucherCode;
    enigma.voucherType = voucherType;
    enigma.voucherBatchId = voucherBatchId;
    await enigma.save();

    const userFound = await this.findOne({ where: { email }, relations: ['enigmaVouchers'] });

    if (userFound) {
      console.log('userFound', userFound);
    }

    const user = new User();
    user.email = email;
    user.enigmaVouchers = [enigma];
    await user.save();

    // Send email
    const result = await this.sendEmail(createVoucherDto, enigmaVoucher);

    return result;
  }
}
