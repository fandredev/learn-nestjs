import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashProtocolService {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, passwordHash: string): Promise<boolean>;
}
