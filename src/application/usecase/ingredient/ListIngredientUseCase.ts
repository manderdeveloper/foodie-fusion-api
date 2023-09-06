import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";


@injectable()
export class ListIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(): Promise<any> {
    const ingredients = await this.ingredientRepository.getAll()
    return ingredients.map(ingredient => ingredient.toPrimitives());
  }

}