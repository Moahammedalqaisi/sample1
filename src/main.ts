import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('expense example')
    .setDescription('The expense API description')
    .setVersion('1.0')
    .addTag('expenses')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
