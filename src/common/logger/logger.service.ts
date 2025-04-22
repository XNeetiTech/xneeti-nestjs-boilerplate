import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogObject } from './logger.interface';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;
  private context: string = 'Application';

  constructor(private configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL') || 'info';
    const environment = this.configService.get<string>('NODE_ENV') || 'development';

    // Define Winston format
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      environment === 'development'
        ? winston.format.printf(({ level, message, timestamp, context, ...meta }) => {
            return `${timestamp} [${context}] ${level}: ${message} ${
              Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
            }`;
          })
        : winston.format.json(),
    );

    // Create transports
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), logFormat),
      }),
    ];

    // Add file transports in production
    if (environment === 'production') {
      const fileRotateTransport = new DailyRotateFile({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
      });

      const errorFileRotateTransport = new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        level: 'error',
      });

      transports.push(fileRotateTransport, errorFileRotateTransport);
    }

    // Create logger instance
    this.logger = winston.createLogger({
      level: logLevel,
      format: logFormat,
      transports,
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  private formatLog(message: any, context?: string, meta?: Record<string, any>): LogObject {
    return {
      logObject: meta || {},
      logMessage: message,
    };
  }

  log(message: any, contextOrObject?: string | Record<string, any>, ...meta: any[]) {
    let context: string | undefined;
    let metaObject: Record<string, any> | undefined;

    if (typeof contextOrObject === 'string') {
      context = contextOrObject;
      metaObject = meta[0];
    } else {
      context = undefined;
      metaObject = contextOrObject;
    }

    const logObject = this.formatLog(message, context, metaObject);
    this.logger.info(logObject.logMessage, {
      context: context || this.context,
      ...logObject.logObject,
    });
  }

  error(message: any, traceOrObject?: string | Record<string, any>, contextOrObject?: string | Record<string, any>, ...meta: any[]) {
    let trace: string | undefined;
    let context: string | undefined;
    let metaObject: Record<string, any> | undefined;

    if (typeof traceOrObject === 'string') {
      trace = traceOrObject;
      if (typeof contextOrObject === 'string') {
        context = contextOrObject;
        metaObject = meta[0];
      } else {
        context = undefined;
        metaObject = contextOrObject;
      }
    } else {
      trace = undefined;
      context = undefined;
      metaObject = traceOrObject;
    }

    const logObject = this.formatLog(message, context, metaObject);
    this.logger.error(logObject.logMessage, {
      context: context || this.context,
      trace,
      ...logObject.logObject,
    });
  }

  warn(message: any, contextOrObject?: string | Record<string, any>, ...meta: any[]) {
    let context: string | undefined;
    let metaObject: Record<string, any> | undefined;

    if (typeof contextOrObject === 'string') {
      context = contextOrObject;
      metaObject = meta[0];
    } else {
      context = undefined;
      metaObject = contextOrObject;
    }

    const logObject = this.formatLog(message, context, metaObject);
    this.logger.warn(logObject.logMessage, {
      context: context || this.context,
      ...logObject.logObject,
    });
  }

  debug(message: any, contextOrObject?: string | Record<string, any>, ...meta: any[]) {
    let context: string | undefined;
    let metaObject: Record<string, any> | undefined;

    if (typeof contextOrObject === 'string') {
      context = contextOrObject;
      metaObject = meta[0];
    } else {
      context = undefined;
      metaObject = contextOrObject;
    }

    const logObject = this.formatLog(message, context, metaObject);
    this.logger.debug(logObject.logMessage, {
      context: context || this.context,
      ...logObject.logObject,
    });
  }

  verbose(message: any, contextOrObject?: string | Record<string, any>, ...meta: any[]) {
    let context: string | undefined;
    let metaObject: Record<string, any> | undefined;

    if (typeof contextOrObject === 'string') {
      context = contextOrObject;
      metaObject = meta[0];
    } else {
      context = undefined;
      metaObject = contextOrObject;
    }

    const logObject = this.formatLog(message, context, metaObject);
    this.logger.verbose(logObject.logMessage, {
      context: context || this.context,
      ...logObject.logObject,
    });
  }
}