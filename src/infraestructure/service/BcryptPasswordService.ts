import { PasswordService } from '@domain/service/PasswordService';
import * as bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class BcryptPasswordService implements PasswordService {
  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordValid;
  }

  async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = process.env.SALTED_ROUNDS;
    const hashedPassword = await bcrypt.hash(plainPassword, Number(saltRounds));
    return hashedPassword;
  }
}