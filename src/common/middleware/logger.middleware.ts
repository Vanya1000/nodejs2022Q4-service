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
      this.logger.log(
        `Method: "${method}", URL: "${originalUrl}", Query: ${queryToJSON}, Body: ${bodyToJSON}, User agent: ${userAgent}, Status code: "${statusCode}", Request time: ${reqTime}ms`,
        'HTTP',
      );
    });
    next();
  }
}
