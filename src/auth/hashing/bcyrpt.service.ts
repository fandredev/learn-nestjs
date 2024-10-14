import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { HashProtocolService } from './hashing.service';

@Injectable()
export class BcryptService extends HashProtocolService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash); // true = logado, false = senha incorreta
  }
}
