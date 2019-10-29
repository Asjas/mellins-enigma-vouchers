import { EntityRepository, Repository } from 'typeorm';

// Entities
import { User } from './entities/user.entity';
import { EnigmaVoucher } from './entities/enigma.entity';

// Dto
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { EnigmaDto } from './dto/enigma.dto';

@EntityRepository(User)
export class VoucherRepository extends Repository<User> {
  async getVoucherByEmail(createVoucherDto: CreateVoucherDto): Promise<User> {
    const { email } = createVoucherDto;
    const result = await this.findOne({ where: { email }, relations: ['enigmaVouchers'] });

    return result;
  }

  async createVoucher(createVoucherDto: CreateVoucherDto, enigmaVoucher: EnigmaDto): Promise<User> {
    const { email } = createVoucherDto;
    const { issueDate, voucherCode, voucherType, voucherAmount, voucherDiscount, voucherBatchId } = enigmaVoucher;

    const enigma = new EnigmaVoucher();
    enigma.issueDate = issueDate;
    enigma.voucherCode = voucherCode;
    enigma.voucherType = voucherType;
    enigma.voucherAmount = voucherAmount || 0;
    enigma.voucherDiscount = voucherDiscount || 0;
    enigma.voucherBatchId = voucherBatchId;
    await enigma.save();

    const userFound = await this.findOne({ where: { email }, relations: ['enigmaVouchers'] });

    if (userFound) {
      userFound.enigmaVouchers.push(enigma);
      await userFound.save();
      return userFound;
    }

    const user = new User();
    user.email = email;
    user.enigmaVouchers = [enigma];
    await user.save();

    return user;
  }
}
