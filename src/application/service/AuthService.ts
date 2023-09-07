import { inject, injectable } from "inversify";
import { User } from "../../domain/model/User";
import { LoginDto } from "@application/dtos/controller/LoginDto";
import { UserRepository } from "@domain/repository/UserRepository";
import { AuthTokenService } from "@domain/service/AuthTokenService";
import { PasswordService } from "@domain/service/PasswordService";
import { ForbiddenError } from "@shared/error/ForbiddenError";
import { NotFoundError } from "@shared/error/NotFoundError";


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