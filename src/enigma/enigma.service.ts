import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherDto } from 'src/voucher/dto/voucher.dto';

@Injectable()
export class EnigmaService {
  constructor(private readonly http: HttpService) {}

  async createEnigmaValueVoucher(createVoucherDto: CreateVoucherDto, voucher: VoucherDto): Promise<AxiosResponse<any>> {
    const { email } = createVoucherDto;
    const { definitionId, value } = voucher;

    return this.http
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

  async createEnigmaDiscountVoucher(
    createVoucherDto: CreateVoucherDto,
    voucher: VoucherDto,
  ): Promise<AxiosResponse<any>> {
    const { email } = createVoucherDto;
    const { definitionId, discount } = voucher;

    return this.http
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
