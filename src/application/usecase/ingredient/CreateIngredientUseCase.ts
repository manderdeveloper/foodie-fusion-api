import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { Ingredient } from "../../../domain/model/Ingredient";


@injectable()
export class CreateIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(body: any): Promise<void> {
    const ingredient = Ingredient.fromPrimitives({...body})
    await this.ingredientRepository.create(ingredient);
  }

}