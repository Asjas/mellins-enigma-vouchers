import { Injectable } from '@nestjs/common';

// Repositories
import { VoucherRepository } from './voucher.repository';

// Services
import { VoucherMailerService } from './services/mailer.service';
import { EnigmaService } from '../services/enigma/enigma.service';

// Dto
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { VoucherDto } from './dto/voucher.dto';
import { EnigmaDto } from './dto/enigma.dto';

@Injectable()
export class VoucherService {
  constructor(
    private readonly voucherRepository: VoucherRepository,
    private readonly enigmaService: EnigmaService,
    private readonly voucherMailerService: VoucherMailerService,
  ) {}

  async createVoucherPrecinct(createVoucherDto: CreateVoucherDto): Promise<{ code: number; result: string }> {
    const voucherDto = {
      type: 'PRECINCT_PROMOTION',
      definitionId: '5d84b4dbbaaab1b6784fe62b',
      value: 2000,
    } as VoucherDto;
    const date = new Date();
    let code: number;
    let result: string;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: voucherDto.type,
      voucherAmount: voucherDto.value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    const matchedVoucherType =
      foundUser && foundUser.enigmaVouchers.map(voucher => voucher.voucherType === enigmaVoucher.voucherType);

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType && matchedVoucherType.includes(true)) {
      code = 203;
      result = 'A voucher for this email address has already been created and emailed.';

      return { code, result };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    await this.enigmaService
      .createEnigmaValueVoucher(createVoucherDto, voucherDto)
      .then(async response => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        await this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        await this.voucherMailerService.sendEmailFourways(createVoucherDto, enigmaVoucher);

        code = 201;
        result = 'Voucher has been sent to your email address.';
      })
      .catch(error => {
        if (error) {
          const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
          const { detail } = error.response.data;

          if (voucherUnavailableRegex.test(detail)) {
            code = 203;
            result = 'No more vouchers are available.';
            return;
          }

          if (error.response.status >= 400) {
            code = 400;
            result = 'Voucher was not created. Please try again.';
            return;
          }

          code = 500;
          result = error;
        }
      });

    return { code, result };
  }

  async createVoucherGuess(createVoucherDto: CreateVoucherDto): Promise<{ code: number; result: string }> {
    const voucherDto = {
      type: 'GUESS_PROMOTION_SEP',
      definitionId: '5d889652baaab1b67851fa61',
      discount: 100,
    } as VoucherDto;
    const date = new Date();
    let code: number;
    let result: string;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: voucherDto.type,
      voucherDiscount: voucherDto.value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);
    const matchedVoucherType =
      foundUser && foundUser.enigmaVouchers.map(voucher => voucher.voucherType === enigmaVoucher.voucherType);

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType && matchedVoucherType.includes(true)) {
      code = 203;
      result = 'A voucher for this email address has already been created and emailed.';

      return { code, result };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    await this.enigmaService
      .createEnigmaValueVoucher(createVoucherDto, voucherDto)
      .then(async response => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        await this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        await this.voucherMailerService.sendEmailGuess(createVoucherDto, enigmaVoucher);

        code = 201;
        result = 'Voucher has been sent to your email address.';
      })
      .catch(error => {
        if (error) {
          const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
          const { detail } = error.response.data;

          if (voucherUnavailableRegex.test(detail)) {
            code = 203;
            result = 'No more vouchers are available.';
            return;
          }

          if (error.response.status >= 400) {
            code = 400;
            result = 'Voucher was not created. Please try again.';
            return;
          }

          code = 500;
          result = error;
        }
      });

    return { code, result };
  }

  async createSummerSalePromotion(createVoucherDto: CreateVoucherDto): Promise<{ code: number; result: string }> {
    const voucherDto = {
      type: 'SUMMER_SALE_PROMOTION',
      definitionId: '5dadb9f4ebd1f31230e18299',
      value: 45,
    } as VoucherDto;
    const date = new Date();
    let code: number;
    let result: string;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: voucherDto.type,
      voucherDiscount: voucherDto.value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);

    const matchedVoucherType =
      foundUser && foundUser.enigmaVouchers.map(voucher => voucher.voucherType === enigmaVoucher.voucherType);

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType && matchedVoucherType.includes(true)) {
      code = 203;
      result = 'A voucher for this email address has already been created and emailed.';

      return { code, result };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    await this.enigmaService
      .createEnigmaValueVoucher(createVoucherDto, voucherDto)
      .then(async response => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        await this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        await this.voucherMailerService.sendSummerSalePromotion(createVoucherDto, enigmaVoucher);

        code = 201;
        result = 'Voucher has been sent to your email address.';
      })
      .catch(error => {
        if (error) {
          const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
          const { detail } = error.response.data;

          if (voucherUnavailableRegex.test(detail)) {
            code = 203;
            result = 'No more vouchers are available.';
            return;
          }

          if (error.response.status >= 400) {
            code = 400;
            result = 'Voucher was not created. Please try again.';
            return;
          }

          code = 500;
          result = error;
        }
      });

    return { code, result };
  }

  async createEmporioArmaniPromotion(createVoucherDto: CreateVoucherDto): Promise<{ code: number; result: string }> {
    const voucherDto = {
      type: 'EMPORIO_ARMANI_PROMOTION',
      definitionId: '5da6d1ddebd1f31230de1ec4',
      value: 45,
    } as VoucherDto;
    const date = new Date();
    let code: number;
    let result: string;

    // replace with data from enigma api
    const enigmaVoucher: EnigmaDto = {
      issueDate: date.toISOString(),
      voucherCode: '',
      voucherType: voucherDto.type,
      voucherDiscount: voucherDto.value,
      voucherBatchId: '',
    };

    const foundUser = await this.voucherRepository.getVoucherByEmail(createVoucherDto);

    const matchedVoucherType =
      foundUser && foundUser.enigmaVouchers.map(voucher => voucher.voucherType === enigmaVoucher.voucherType);

    // If a previous matching voucher has been found, return a message and stop
    if (matchedVoucherType && matchedVoucherType.includes(true)) {
      code = 203;
      result = 'A voucher for this email address has already been created and emailed.';

      return { code, result };
    }

    // If there hasn't been a voucher created for this email account, then create and email it
    await this.enigmaService
      .createEnigmaDiscountVoucher(createVoucherDto, voucherDto)
      .then(async response => {
        enigmaVoucher.voucherCode = response.voucherCode;
        enigmaVoucher.voucherBatchId = response.voucherBatchId;

        await this.voucherRepository.createVoucher(createVoucherDto, enigmaVoucher);

        await this.voucherMailerService.sendEmporioArmaniPromotion(createVoucherDto, enigmaVoucher);

        code = 201;
        result = 'Voucher has been sent to your email address.';
      })
      .catch(error => {
        if (error) {
          const voucherUnavailableRegex = /Not enough predefined voucher codes available/g;
          const { detail } = error.response.data;

          if (voucherUnavailableRegex.test(detail)) {
            code = 203;
            result = 'No more vouchers are available.';
            return;
          }

          if (error.response.status >= 400) {
            code = 400;
            result = 'Voucher was not created. Please try again.';
            return;
          }

          code = 500;
          result = error;
        }
      });

    return { code, result };
  }
}
