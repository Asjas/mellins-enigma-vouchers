// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { EnigmaModule } from '../services/enigma/enigma.module';

// Controllers
import { VoucherController } from './voucher.controller';

// Services
import { VoucherService } from './voucher.service';
import { VoucherMailerService } from './services/mailer.service';

// Repositories
import { VoucherRepository } from './voucher.repository';
import { MockEnigmaService } from '../services/mock/enigma-mock.service';

@Module({
  imports: [EnigmaModule, TypeOrmModule.forFeature([VoucherRepository])],
  providers: [VoucherService, VoucherMailerService, MockEnigmaService],
  controllers: [VoucherController],
})
export class VoucherModule {}
