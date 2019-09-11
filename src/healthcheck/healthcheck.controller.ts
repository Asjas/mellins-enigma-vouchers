import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('/_ping')
  async ping(): Promise<string> {
    return 'Server is healthy!';
  }
}
