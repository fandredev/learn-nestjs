import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Helmet - Adiciona cabeçalhos de segurança no protocolo HTTP
  // Cors - Permitir outros dominios faça requests na sua aplicação
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors({
      origin: '*',
    });
  }

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Messages API')
    .setDescription('Send messages to your friends.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    // liga os validators de class-validator e class-transformer
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // levanta erro quando a chave não existir
      // transform: true, // tenta transformar os tipos de dados de param e dtos
    }),
  );

  await app.listen(process.env.APP_PORT);
}
bootstrap();
