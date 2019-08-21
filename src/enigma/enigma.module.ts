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
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [EnigmaService],
  exports: [EnigmaService],
})
export class EnigmaModule {}
