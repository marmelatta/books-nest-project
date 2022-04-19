import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionFilter } from './filters/my-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
