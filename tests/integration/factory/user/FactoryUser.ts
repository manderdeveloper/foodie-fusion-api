import { inject } from 'inversify';
import { UserRepository } from '@domain/repository/UserRepository';
import { User } from '@domain/model/User';

export class UserFactory {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository) {
  }

  async createUserAndSave(userData: any): Promise<User> {
    const fixtureUser = await User.fromPrimitives(userData)
    await this.userRepository.create(fixtureUser);
    return fixtureUser;
  }
}
