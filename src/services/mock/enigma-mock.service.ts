import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// DTO
import { CreateVoucherDto } from '../../voucher/dto/create-voucher.dto';
import { VoucherDto } from '../../voucher/dto/voucher.dto';
import { VoucherResultDto } from '../../voucher/dto/voucher-result.dto';

@Injectable()
export class MockEnigmaService {
  async createEnigmaValueVoucher(
    createVoucherDto: CreateVoucherDto,
    voucherDto: VoucherDto,
  ): Promise<VoucherResultDto> {
    if (!createVoucherDto || !voucherDto) {
      throw 'Parameters not supplied as expected';
    }

    const mockVoucherResult: VoucherResultDto = {
      voucherCode: '34234234',
      voucherBatchId: '234234234324',
    };

    return of(mockVoucherResult)
      .pipe(delay(200))
      .toPromise();
  }

  async createEnigmaDiscountVoucher(
    createVoucherDto: CreateVoucherDto,
    voucherDto: VoucherDto,
  ): Promise<VoucherResultDto> {
    if (!createVoucherDto || !voucherDto) {
      throw 'Parameters not supplied as expected';
    }

    const mockVoucherResult: VoucherResultDto = {
      voucherCode: '34234234',
      voucherBatchId: '234234234324',
    };

    return of(mockVoucherResult)
      .pipe(delay(200))
      .toPromise();
  }
}
