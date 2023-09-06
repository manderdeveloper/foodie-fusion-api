import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { User } from "../../../domain/model/User";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('IngredientRepository') private ingredientRepository: IngredientRepository
  ) {}

  public async execute(body: any): Promise<any> {
    const user = User.fromPrimitives({...body})
    await this.userRepository.create(user);
    
  }

}