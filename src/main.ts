import { readFile } from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = yaml.load(
    await readFile('./doc/api.yaml', 'utf8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
