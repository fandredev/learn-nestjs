import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from 'src/person/person.module';
import { SimpleMiddleware } from 'src/middlewares/simple.middleware';
import { ConfigModule } from '@nestjs/config';
// import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

import * as Joi from '@hapi/joi';

@Module({
  imports: [
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
        DATABASE_SYNCRONIZE: Joi.number().min(0).max(1).default(0),
      }),
    }),
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES), // Carrega entidades sem precisar especificar elas
      synchronize: Boolean(process.env.DATABASE_SYNCRONIZE), // Sincroniza com o DB. Não deve ser usado em produção!
    }),
  ],
  controllers: [AppController],
  // providers: [ // Coloquem isso no módulo que vocês querem proteger
  //   {
  //     provide: 'APP_GUARD',
  //     useClass: IsAdminGuard,
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '/person',
      method: RequestMethod.ALL,
    });
  }
}
