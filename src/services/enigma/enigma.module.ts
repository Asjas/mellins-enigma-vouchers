// Modules
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';

// Services
import { EnigmaService } from './enigma.service';
import { ConfigService } from '../../config/config.service';

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
