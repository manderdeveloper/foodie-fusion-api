import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { User } from "../../../domain/model/User";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { INITIAL_INGREDIENTS } from "../../../infraestructure/config/IngredientsInitialization";
import { Ingredient } from "../../../domain/model/Ingredient";
import { UuidValueObject } from "../../../domain/valueobject/primitives/UuidValueObject";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('IngredientRepository') private ingredientRepository: IngredientRepository
  ) {}

  public async execute(body: any): Promise<any> {
    const user = User.fromPrimitives({...body})
    await this.userRepository.create(user);
    const initalIngredients = INITIAL_INGREDIENTS;
    for (let rawIngredient of initalIngredients) {
      const ingredient = Ingredient.fromPrimitives({id: UuidValueObject.random().value ,name: rawIngredient.name, isMain: rawIngredient.isMain, user: user.id.value})
      await this.ingredientRepository.create(ingredient);
    }
  }

}