import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { User } from "../../../domain/model/User";


@injectable()
export class ListIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(user: User): Promise<any> {
    const ingredients = await this.ingredientRepository.getAllIngredientsByUser(user.id.value)
    return ingredients.map(ingredient => ingredient.toPrimitives());
  }

}