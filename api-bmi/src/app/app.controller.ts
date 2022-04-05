import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthStatus } from './health-status.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  healthCheck(): HealthStatus {
    return { status: 'ok', timestamp: Date.now() };
  }
}
