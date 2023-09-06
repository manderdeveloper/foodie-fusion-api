import * as jwt from 'jsonwebtoken';
import { inject, injectable } from "inversify";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { NotFoundError } from "../../shared/error/NotFoundError";
import { ForbiddenError } from '../../shared/error/ForbiddenError';

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
    const options = { expiresIn: '8h'};
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  async validateAuthToken(authToken: string): Promise<User> {
    const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET) as {userId: {value:string}, userEmail: Object};
    const userId = decodedUser.userId.value;
    const user = await this.userRepository.getById(userId);
    if (!user) throw new ForbiddenError();
    return user;
  }
}