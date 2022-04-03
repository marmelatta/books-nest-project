import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionFilter } from './filters/my-exception.filter';
import * as module from 'module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
