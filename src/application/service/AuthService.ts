import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { inject, injectable } from "inversify";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { NotFoundError } from "../../shared/error/NotFoundError";
import { ForbiddenError } from '../../shared/error/ForbiddenError';
import { LoginDto } from '../dtos/controller/LoginDto';

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const user = await this.userRepository.getByEmail(dto.email);
    if (!user) throw new NotFoundError();
    const isPasswordValid = await bcrypt.compare(dto.password, user.password.value);
    if (!isPasswordValid) throw new ForbiddenError();
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