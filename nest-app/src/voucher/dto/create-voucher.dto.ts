import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateVoucherDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  param: string;
}
