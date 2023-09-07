export interface PasswordService {
  comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
  hashPassword(plainPassword: string): Promise<string>;
}
