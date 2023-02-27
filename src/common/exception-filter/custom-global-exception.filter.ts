import { MyLogger } from './../../logger/logger.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomGlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: MyLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody: Record<string, string | number>;

    if (isHttpException) {
      responseBody = {
        statusCode: httpStatus,
        message: exception.message || null,
        timestamp: new Date().toISOString(),
      };
    } else {
      responseBody = {
        statusCode: httpStatus,
        message: 'Internal server error',
      };
    }

    const stackTraceForLogger =
      exception instanceof Error ? exception.stack : '';

    const messageForLogger = `Method: "${ctx.getRequest().method}", URL: "${
      ctx.getRequest().originalUrl
    }", Query: ${JSON.stringify(
      ctx.getRequest().query,
    )}, Body: ${JSON.stringify(
      ctx.getRequest().body,
    )}, Status code: "${httpStatus}"`;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    this.logger.error(messageForLogger, stackTraceForLogger, 'GlobalException');
  }
}
