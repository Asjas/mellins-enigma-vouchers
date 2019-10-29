import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Modules
import { AppModule } from './app.module';

// Services
import { ConfigService } from './config/config.service';

const configService = new ConfigService('.env');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }), {
    cors: {
      origin: 'http://mellins.co.za',
    },
  });

  await app.listen(configService.PORT, '0.0.0.0');
}

bootstrap();
