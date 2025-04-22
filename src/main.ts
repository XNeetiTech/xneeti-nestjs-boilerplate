import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  loggerService.log(`Application running on port ${port}`, 'Bootstrap');
}
bootstrap();