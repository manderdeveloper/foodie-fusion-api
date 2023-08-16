import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repositories/IngredientRepository";
import { Ingredient } from "../../../domain/models/Ingredient";


@injectable()
export class CreateIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(body: any): Promise<void> {
    const ingredient = Ingredient.fromPrimitives({...body})
    await this.ingredientRepository.create(ingredient);
  }

}