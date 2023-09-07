import { CreateIngredientDto } from "@application/dtos/controller/CreateIngredientDto";
import { Ingredient } from "@domain/model/Ingredient";
import { User } from "@domain/model/User";
import { IngredientRepository } from "@domain/repository/IngredientRepository";
import { inject, injectable } from "inversify";



@injectable()
export class CreateIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(dto: CreateIngredientDto, user: User): Promise<void> {
    const ingredient = Ingredient.fromPrimitives({...dto, user: user.id.value})
    await this.ingredientRepository.create(ingredient);
  }

}