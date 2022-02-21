import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  const configService = new ConfigService();
  const sync = configService.get('DB_SYNC');
  if (sync !== 'false') {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('api document')
      .setDescription('API仕様書')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('document', app, document);
  }
  const port = configService.get('API_PORT') || 3003;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
