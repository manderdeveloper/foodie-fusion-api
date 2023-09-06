import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { User } from "../../../domain/model/User";


@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  public async execute(body: any): Promise<any> {
    const ingredient = User.fromPrimitives({...body})
    await this.userRepository.create(ingredient);
  }

}