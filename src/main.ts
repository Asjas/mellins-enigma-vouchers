import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

const configService = new ConfigService('.env');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {
      cors: {
        origin: 'http://mellins.co.za',
      },
    },
  );

  await app.listen(configService.PORT, '0.0.0.0');
}

bootstrap();
