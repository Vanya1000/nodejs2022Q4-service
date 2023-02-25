import { MyLogger } from './../../logger/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqStart = Date.now();
    const { method, originalUrl, query, body } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;
      const queryToJSON = JSON.stringify(query);
      const bodyToJSON = JSON.stringify(body);
      const reqTime = Date.now() - reqStart;
      const message = `Method: "${method}", URL: "${originalUrl}", Query: ${queryToJSON}, Body: ${bodyToJSON}, User agent: ${userAgent}, Status code: "${statusCode}", Request time: ${reqTime}ms`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
