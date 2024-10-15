import { Global, Module } from '@nestjs/common';
import { HashProtocolService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcyrpt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';

import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Global() // Não preciso importar o AuthModule em outros módulos
@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashProtocolService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashProtocolService, JwtModule, TypeOrmModule],
})
export class AuthModule {}
