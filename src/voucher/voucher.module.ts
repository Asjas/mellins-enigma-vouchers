import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { EnigmaModule } from '../enigma/enigma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity';

@Module({
  imports: [EnigmaModule, TypeOrmModule.forFeature([Voucher])],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
