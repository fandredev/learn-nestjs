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
// import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Module({
  imports: [
    MessagesModule,
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'udemynest',
      password: '123456',
      autoLoadEntities: true, // Carrega entidades sem precisar especificar elas
      synchronize: true, // Sincroniza com o DB. Não deve ser usado em produção!
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
