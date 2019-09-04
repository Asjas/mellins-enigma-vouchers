import { Module, HttpModule } from '@nestjs/common';
import { EnigmaService } from './enigma.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.ENIGMA_URL,
        headers: { Authorization: 'Basic ZGF3aWRwQHBpZW5hYXJwYXJ0bmVycy5jby56YTpFbmlnbWFAMDA3' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [EnigmaService],
  exports: [EnigmaService],
})
export class EnigmaModule {}
