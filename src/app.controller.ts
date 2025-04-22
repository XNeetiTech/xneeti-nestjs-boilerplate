import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './common/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('AppController');
  }

  @Get()
  getHello(): string {
    this.logger.log('Called getHello method', { endpoint: 'GET /' });
    return this.appService.getHello();
  }
}