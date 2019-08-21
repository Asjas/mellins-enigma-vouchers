import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { VoucherModule } from './voucher/voucher.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
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
        },
        template: {
          dir: __dirname + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
