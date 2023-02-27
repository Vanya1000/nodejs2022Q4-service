import { MyLogger } from './logger/logger.service';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import 'dotenv/config';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  const swaggerDocument = yaml.load(
    await readFile(join('.', 'doc', 'api.yaml'), 'utf8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

  const logger = app.get(MyLogger);
  process.on('uncaughtException', (err: Error) => {
    logger.error(err, err.stack, 'UncaughtException');
    process.exit(1);
  });

  process.on('unhandledRejection', (err: Error) => {
    logger.error(err, err.stack, 'UnhandledRejection');
  });
}
bootstrap();
