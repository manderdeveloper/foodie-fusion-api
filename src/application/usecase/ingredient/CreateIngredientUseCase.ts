import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { Ingredient } from "../../../domain/model/Ingredient";
import { User } from "../../../domain/model/User";


@injectable()
export class CreateIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(body: any, user: User): Promise<void> {
    const ingredient = Ingredient.fromPrimitives({...body, user: user.id.value})
    await this.ingredientRepository.create(ingredient);
  }

}