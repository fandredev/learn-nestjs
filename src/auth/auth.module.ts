import { Global, Module } from '@nestjs/common';
import { HashProtocolService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcyrpt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global() // Não preciso importar o AuthModule em outros módulos
@Module({
  providers: [
    {
      provide: HashProtocolService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [HashProtocolService],
})
export class AuthModule {}
