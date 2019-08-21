import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EnigmaService {
  constructor(private readonly http: HttpService, private readonly config: ConfigService) {}

  private readonly auth = Buffer.from(
    `${this.config.ENIGMA_USERNAME}:${this.config.ENIGMA_PASSWORD}`,
  ).toString('base64');
  private readonly bearer = `Basic ${this.auth}`;
  private readonly tenant = 'mellins';
  private readonly definitionId = '5c162225995900346de27ba0';

  getTenantDetail$(): Observable<AxiosResponse<any>> {
    return this.http
      .get(`${this.tenant}/detail`, {
        headers: { Authorization: this.bearer },
      })
      .pipe(map(response => response.data));
  }

  createEnigmaVoucher(createVoucherDto: CreateVoucherDto): Observable<AxiosResponse<any>> {
    const { email, param } = createVoucherDto;

    return this.http
      .post(`${this.tenant}/definitions/${this.definitionId}/vouchers`, {
        headers: { Authorization: this.bearer },
        data: {
          externalReferenceCode: email,
          definition: {
            voucherType: {
              valueAmount: 120,
            },
          },
        },
      })
      .pipe(map(response => response.data));
  }
}
