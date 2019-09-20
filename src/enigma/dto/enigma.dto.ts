import { IsNotEmpty } from 'class-validator';

export class EnigmaDto {
  @IsNotEmpty()
  issueDate: string;

  @IsNotEmpty()
  voucherCode: string;

  @IsNotEmpty()
  voucherType: string;

  @IsNotEmpty()
  voucherAmount: number;

  @IsNotEmpty()
  voucherBatchId: string;
}
