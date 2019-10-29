// Modules
import { Module } from '@nestjs/common';

// Services
import { ConfigService } from './config.service';

const envFile = process.env.NODE_ENV !== 'production' ? '.env' : '.env.prod';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envFile),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
