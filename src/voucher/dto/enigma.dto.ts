import { IsNotEmpty } from 'class-validator';

export class EnigmaDto {
  @IsNotEmpty()
  issueDate: string;

  @IsNotEmpty()
  voucherCode: string;

  @IsNotEmpty()
  voucherType: string;

  voucherAmount?: number;

  voucherDiscount?: number;

  @IsNotEmpty()
  voucherBatchId: string;
}
