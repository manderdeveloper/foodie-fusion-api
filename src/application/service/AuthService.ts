import { inject, injectable } from "inversify";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { NotFoundError } from "../../shared/error/NotFoundError";
import { ForbiddenError } from '../../shared/error/ForbiddenError';
import { LoginDto } from '../dtos/controller/LoginDto';
import { PasswordService } from '../../domain/service/PasswordService';
import { AuthTokenService } from '../../domain/service/AuthTokenService';

@injectable()
export class AuthService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('PasswordService') private passwordService: PasswordService,
    @inject('AuthTokenService') private authTokenService: AuthTokenService
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const user = await this.userRepository.getByEmail(dto.email);
    if (!user) throw new NotFoundError();
    const isValidPassword = await this.passwordService.comparePasswords(dto.password, user.password.value);
    if (!isValidPassword) throw new ForbiddenError();
    return this.authTokenService.generateToken(user);
  }

  async validateAuthToken(authToken: string): Promise<User> {
    const userId = this.authTokenService.verifyToken(authToken);
    const user = await this.userRepository.getById(userId);
    if (!user) throw new ForbiddenError();
    return user;
  }
}