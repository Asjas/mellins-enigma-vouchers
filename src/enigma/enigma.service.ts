import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EnigmaService {
  constructor(private readonly http: HttpService, private readonly config: ConfigService) {}

  private readonly definitionId = '5c162225995900346de27ba0';

  async getTenantDetail(): Promise<AxiosResponse<any>> {
    return this.http
      .get(`mellins/detail`)
      .pipe(map(response => response.data))
      .toPromise();
  }

  async createEnigmaVoucher(createVoucherDto: CreateVoucherDto): Promise<AxiosResponse<any>> {
    const { email, param } = createVoucherDto;

    return this.http
      .post(`/mellins/definitions/${this.definitionId}/vouchers`, {
        externalReferenceCode: 'asjas@outlook.com',
        definition: {
          voucherType: {
            valueAmount: 120,
          },
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }

  async createEnigmaVoucher2(createVoucherDto: CreateVoucherDto): Promise<AxiosResponse<any>> {
    const { email, param } = createVoucherDto;

    return this.http
      .post('/mellins/definitions/5c162225995900346de27ba0/vouchers', {
        data: {
          externalReferenceCode: 'asjas@outlook.com',
          definition: {
            voucherType: {
              valueAmount: 120,
            },
          },
        },
      })
      .pipe(map(response => response.data))
      .toPromise();
  }
}
