import { Test, TestingModule } from '@nestjs/testing';
import { MailerService, MailerModule } from '@nest-modules/mailer';
import { VoucherService } from './voucher.service';
import { VoucherRepository } from './voucher.repository';
import { EnigmaService } from '../services/enigma/enigma.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { VoucherMailerService } from './services/mailer.service';
import { MockEnigmaService } from '../services/mock/enigma-mock.service';
import { HttpModule } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('VoucherService', () => {
  const createVoucherDto: CreateVoucherDto = {
    email: 'test@testdomain.com',
  };

  let service: VoucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            type: 'mysql' as 'mysql',
            host: config.MYSQL_HOST,
            port: config.MYSQL_PORT,
            username: config.MYSQL_USERNAME,
            password: config.MYSQL_PASSWORD,
            database: config.MYSQL_DATABASE,
            synchronize: config.MYSQL_SYNCHRONIZE,
            keepConnectionAlive: true,
            entities: [__dirname + './entities/*.entity{.ts,.js}'],
          }),
          inject: [ConfigService],
        }),
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            baseURL: config.ENIGMA_URL,
            headers: { Authorization: 'Basic ZGF3aWRwQHBpZW5hYXJwYXJ0bmVycy5jby56YTpFbmlnbWFAMDA3' },
          }),
          inject: [ConfigService],
        }),
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
      providers: [VoucherMailerService, VoucherRepository, EnigmaService, VoucherService],
    })
      .overrideProvider(EnigmaService)
      .useValue(MockEnigmaService)
      .compile();

    service = module.get<VoucherService>(VoucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a voucher and set user in database', async () => {
    const value = await service.createVoucherPrecinct(createVoucherDto);
    console.log(value);
  });
});
