import { inject } from 'inversify';
import { UserRepository } from '@domain/repository/UserRepository';
import { User } from '@domain/model/User';
import { generateUser } from '@tests/fixtures/user/UserFixture';
import { AuthService } from '@application/service/AuthService';
import { LoginDto } from '@application/dtos/controller/LoginDto';

export class LoginFactory {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('AuthService') private authService: AuthService
    ) {
  }

  async createUserWithToken(): Promise<string> {
    const fixtureUser = generateUser();
    await this.userRepository.create(await User.createFromPrimitives(fixtureUser));
    const token = await this.authService.login(fixtureUser as LoginDto);
    return token;
  }
}
