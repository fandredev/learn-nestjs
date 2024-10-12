import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class HashUtils {
  async hashPassword(password: string, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds);
  }
}

@Injectable()
export class HashUtilsMock {
  async hashPassword() {
    return 'adwqqwwqwq';
  }
}
