import { forwardRef, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { SERVER_NAME } from 'src/common/constants/server-name.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    forwardRef(() => MessagesModule),
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    {
      provide: SERVER_NAME,
      useValue: 'My name is NestJS',
    },
    // {
    //   provide: HashUtils,                      // Use isso nos testes
    //   useValue: new HashUtilsMock(),
    // },
  ],
  exports: [PersonService],
})
export class PersonModule {}
