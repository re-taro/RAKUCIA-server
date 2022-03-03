import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false,
  };
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  const port = Number(process.env.PORT) || 3003;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
