import { Injectable } from '@nestjs/common';
import { LoggerService } from './common/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('AppService');
  }

  getHello(): string {
    this.logger.debug('Processing getHello method', { details: 'No parameters needed' });
    return 'Hello World!';
  }
}