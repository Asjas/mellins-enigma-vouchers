import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class EnigmaService {
  constructor(private readonly http: HttpService) {}

  private readonly definitionId = '5d84b4dbbaaab1b6784fe62b';
  private readonly valueAmount = 2000;

  async createEnigmaVoucher(createVoucherDto: CreateVoucherDto): Promise<AxiosResponse<any>> {
    const { email } = createVoucherDto;

    return this.http
      .post(`/mellins/definitions/${this.definitionId}/vouchers`, {
        externalReferenceCode: email,
        definition: {
          voucherType: {
            valueAmount: this.valueAmount,
          },
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }
}
