import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { EnigmaModule } from '../enigma/enigma.module';

@Module({
  imports: [EnigmaModule],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
