import * as jwt from 'jsonwebtoken';
import { inject, injectable } from "inversify";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { NotFoundError } from "../../shared/error/NotFoundError";

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new NotFoundError();
    return this.generateJWT(user);
  }

  private generateJWT(user: User): string {
    const payload = {
      userId: user.id,
      userEmail: user.email
    }
    const secretKey = process.env.JWT_SECRET;
    const options = {
      expiresIn: '8h'
    }
    return jwt.sign(payload, secretKey, options);
  }

  async validateAuthToken(authToken: string): Promise<User> {
    return 
  }
}