import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { VoucherRepository } from './voucher.repository';
import { EnigmaModule } from '../enigma/enigma.module';

@Module({
  imports: [EnigmaModule, TypeOrmModule.forFeature([VoucherRepository])],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
