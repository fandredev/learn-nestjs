import * as bcrypt from 'bcrypt';

export default class HashUtils {
  async hashPassword(password: string, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds);
  }
}
