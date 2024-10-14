import { Global, Module } from '@nestjs/common';
import { HashProtocolService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcyrpt.service';

@Global() // Não preciso importar o AuthModule em outros módulos
@Module({
  providers: [
    {
      provide: HashProtocolService,
      useClass: BcryptService,
    },
  ],
  exports: [HashProtocolService],
})
export class AuthModule {}
