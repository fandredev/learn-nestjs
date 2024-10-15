import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';
import { Person } from 'src/person/entities/person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Failed to login - Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.configService.get('jwt'),
      );

      const person = await this.personRepository.findOneBy({
        id: payload.sub,
        active: true,
      });

      if (!person) {
        throw new UnauthorizedException('Person not authorized');
      }

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (error) {
      this.logger.error(error.message || 'Failed to login');
      throw new UnauthorizedException(error.message || 'Failed to login');
    }

    return true;
  }

  extractTokenFromHeader(request: Request) {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return null;
    }

    return authorization.split(' ')[1];
  }
}
