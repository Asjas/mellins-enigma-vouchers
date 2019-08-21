import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class EnigmaService {
  constructor(private readonly http: HttpService) {}

  private readonly auth = Buffer.from(
    'dawidp@pienaarpartners.co.za:Enigma@007',
  ).toString('base64');
  private readonly bearer = `Basic ${this.auth}`;
  private readonly tenant = 'mellins';
  private readonly definitionId = '5c162225995900346de27ba0';

  getTenantDetail(): Observable<AxiosResponse<any>> {
    return this.http.get(`${this.tenant}/detail`, {
      headers: { Authorization: this.bearer },
    });
  }

  createEnigmaVoucher(
    createVoucherDto: CreateVoucherDto,
  ): Observable<AxiosResponse<any>> {
    const { email, param } = createVoucherDto;

    return this.http.post(
      `${this.tenant}/definitions/${this.definitionId}/vouchers`,
      {
        headers: { Authorization: this.bearer },
        data: {
          externalReferenceCode: email,
          definition: {
            voucherType: {
              valueAmount: 120,
            },
          },
        },
      },
    );
  }
}
