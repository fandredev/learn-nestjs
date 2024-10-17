import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';

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
