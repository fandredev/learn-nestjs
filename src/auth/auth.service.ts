import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashProtocolService } from './hashing/hashing.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly hashProtocolService: HashProtocolService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private async signJWTAsync<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret: this.configService.get<string>('jwt.secret'),
        audience: this.configService.get<string>('jwt.audience'),
        issuer: this.configService.get<string>('jwt.issuer'),
        expiresIn,
      },
    );
  }

  private async createTokens(person: Person) {
    const accessToken = await this.signJWTAsync<Partial<Person>>(
      person.id,
      this.configService.get<number>('jwt.jwtExpiresIn'),
      { email: person.email },
    );

    const refreshToken = await this.signJWTAsync(
      person.id,
      this.configService.get<number>('jwt.jwtRefreshExpiresIn'),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const person = await this.personRepository.findOneBy({
      email: loginDto.email,
    });

    if (!person) {
      throw new UnauthorizedException('Person not found');
    }

    const passwordIsValid = await this.hashProtocolService.compare(
      loginDto.password,
      person.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createTokens(person);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
      );

      const user = await this.personRepository.findOneBy({
        id: sub,
      });

      if (!user) throw new Error('Person not found');

      return this.createTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid refresh token');
    }
  }
}
