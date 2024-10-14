import { Global, Module } from '@nestjs/common';
import { HashServiceServiceProtocol } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcyrpt.service';

@Global() // Não preciso importar o AuthModule em outros módulos
@Module({
  providers: [
    {
      provide: HashServiceServiceProtocol,
      useClass: BcryptService,
    },
  ],
})
export class AuthModule {}
