import { ConsoleLogger, Injectable } from '@nestjs/common';

type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
    const logLevel = process.env.LOG_LEVEL || 2;
    const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    const choosenLogLevel = logLevels.slice(0, +logLevel + 1);
    this.setLogLevels(choosenLogLevel);
  }
}
