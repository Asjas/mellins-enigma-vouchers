// Modules
import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherModule } from './voucher/voucher.module';
import { ConfigModule } from './config/config.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

// Services
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    HealthcheckModule,
    VoucherModule,
    ConfigModule,
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        username: config.MYSQL_USERNAME,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
