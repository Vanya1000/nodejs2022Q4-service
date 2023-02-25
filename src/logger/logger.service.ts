import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

@Injectable()
export class MyLogger extends ConsoleLogger {
  private maxLogSize = 1000000;
  private logFile = 'log.log';
  private logErrorFile = 'log-error.log';
  // this.options.logLevels = ['error'];

  constructor() {
    super();
    const logLevel = process.env.LOG_LEVEL || 2;
    const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    const choosenLogLevel = logLevels.slice(0, +logLevel + 1);
    this.setLogLevels(['error']);
  }

  // Logs are written to a file.

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    console.log(message);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeToLogFile('log', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }

  private writeToLogFile(
    type: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const logMessage = `Type: [${type}], Time: [${this.getTimestamp()}], Context: [${context}] Info: [${message}]`;
    const logsFolderPath = path.join(process.cwd(), 'src', 'logs');
    if (!fs.existsSync(logsFolderPath)) {
      console.log('Creating logs folder');
      fs.mkdirSync(logsFolderPath);
    }

    if (type === 'error') {
      const logFilePath = path.join(logsFolderPath, this.logErrorFile);
      this.tryWriteToLogFile(logFilePath, logMessage);
    } else {
      const logFilePath = path.join(logsFolderPath, this.logFile);
      this.tryWriteToLogFile(logFilePath, logMessage);
    }
  }

  private tryWriteToLogFile(logFilePath: string, logMessage: string) {
    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      const fileSize = Math.round(stats.size / 1024);
      if (fileSize > this.maxLogSize) {
        console.log('creating new log file');
      } else {
        fs.appendFileSync(logFilePath, logMessage + '\n', 'utf-8');
        console.log('appending to log file');
      }
    } else {
      fs.writeFileSync(logFilePath, logMessage + '\n', 'utf-8');
    }
  }
}
