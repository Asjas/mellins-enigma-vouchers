import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

// DTO
import { CreateVoucherDto } from '../../voucher/dto/create-voucher.dto';
import { VoucherDto } from '../../voucher/dto/voucher.dto';
import { VoucherResultDto } from '../../voucher/dto/voucher-result.dto';

@Injectable()
export class EnigmaService {
  constructor(private readonly _http: HttpService) {}

  createEnigmaValueVoucher(createVoucherDto: CreateVoucherDto, voucherDto: VoucherDto): Promise<VoucherResultDto> {
    const { email } = createVoucherDto;
    const { definitionId, value } = voucherDto;

    return this._http
      .post(`/mellins/definitions/${definitionId}/vouchers`, {
        externalReferenceCode: email,
        definition: {
          voucherType: {
            valueAmount: value,
          },
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }

  createEnigmaDiscountVoucher(createVoucherDto: CreateVoucherDto, voucherDto: VoucherDto): Promise<VoucherResultDto> {
    const { email } = createVoucherDto;
    const { definitionId, discount } = voucherDto;

    return this._http
      .post(`/mellins/definitions/${definitionId}/vouchers`, {
        externalReferenceCode: email,
        definition: {
          voucherType: {
            discountPercentage: discount,
          },
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }
}
