import { Test, TestingModule } from '@nestjs/testing';
import { MailerService, MailerModule } from '@nest-modules/mailer';
import { VoucherService } from './voucher.service';
import { VoucherRepository } from './voucher.repository';
import { EnigmaService } from '../services/enigma/enigma.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

describe('VoucherService', () => {
  let service: VoucherService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            transport: {
              host: config.SMTP_HOST,
              port: config.SMTP_PORT,
              auth: {
                user: config.MAIL_USER,
                pass: config.MAIL_PASS,
              },
              secure: false,
              tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
              },
            },
            defaults: {
              from: '"Mellins iStyle" <vouchers@mellins.co.za>',
              subject: 'Mellins iStyle - Voucher',
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [VoucherService, MailerService, VoucherRepository, EnigmaService],
    }).compile();

    service = module.get<VoucherService>(VoucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
