import { ConsoleLogger, Injectable } from '@nestjs/common';
import { EOL } from 'os';
import * as fs from 'fs';
import * as path from 'path';

type LogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';

@Injectable()
export class MyLogger extends ConsoleLogger {
  private logsFolderPath = path.join(process.cwd(), 'logs');

  private maxLogSize = +process.env.MAX_SIZE_LOG_FILE_IN_KB * 1024 || 25 * 1024;

  private writeErrorLogPath: string;
  private writeLogPath: string;

  constructor() {
    super();
    const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    const logLevel = process.env.LOG_LEVEL as LogLevel;
    let indexLog = logLevels.indexOf(logLevel);
    if (indexLog === -1) {
      indexLog = 2; // if wrong log level is set, set log level to 'log'
    }
    const choosenLogLevel = logLevels.slice(0, indexLog + 1);
    this.setLogLevels(choosenLogLevel);

    if (!fs.existsSync(this.logsFolderPath)) {
      fs.mkdirSync(this.logsFolderPath);
    }
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeToLogFile('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeToLogFile('warn', message, context);
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeToLogFile('log', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeToLogFile('debug', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeToLogFile('verbose', message, context);
  }

  private writeToLogFile(
    type: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    if (!this.options.logLevels.includes(type)) {
      return;
    }
    const logMessage = `Type: [${type}], Time: [${this.getTimestamp()}], Context: [${context}] Info: [${message}]`;
    try {
      if (type === 'error') {
        if (fs.existsSync(this.writeErrorLogPath)) {
          const stat = fs.statSync(this.writeErrorLogPath);
          const fileSize = Math.round(stat.size);
          if (fileSize < this.maxLogSize) {
            fs.appendFileSync(
              this.writeErrorLogPath,
              EOL + logMessage + EOL + trace || '' + EOL,
              'utf-8',
            );
          } else {
            const logFilePath = path.join(
              this.logsFolderPath,
              `${new Date().toISOString()}-error.log`,
            );
            this.writeErrorLogPath = logFilePath;
            fs.writeFileSync(
              this.writeErrorLogPath,
              EOL + logMessage + EOL + trace || '' + EOL,
              'utf-8',
            );
          }
        } else {
          const logFilePath = path.join(
            this.logsFolderPath,
            `${new Date().toISOString()}-error.log`,
          );
          this.writeErrorLogPath = logFilePath;
          fs.writeFileSync(
            this.writeErrorLogPath,
            EOL + logMessage + EOL + trace || '' + EOL,
            'utf-8',
          );
        }
      } else {
        if (fs.existsSync(this.writeLogPath)) {
          const stat = fs.statSync(this.writeLogPath);
          const fileSize = Math.round(stat.size);
          if (fileSize < this.maxLogSize) {
            fs.appendFileSync(this.writeLogPath, message + EOL, 'utf-8');
          } else {
            const logFilePath = path.join(
              this.logsFolderPath,
              `${new Date().toISOString()}-log.log`,
            );
            this.writeLogPath = logFilePath;
            fs.writeFileSync(this.writeLogPath, message + EOL, 'utf-8');
          }
        } else {
          const logFilePath = path.join(
            this.logsFolderPath,
            `${new Date().toISOString()}-log.log`,
          );
          this.writeLogPath = logFilePath;
          fs.writeFileSync(this.writeLogPath, message + EOL, 'utf-8');
        }
      }
    } catch {}
  }
}
