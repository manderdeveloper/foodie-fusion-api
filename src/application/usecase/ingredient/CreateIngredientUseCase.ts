import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { Ingredient } from "../../../domain/model/Ingredient";
import { User } from "../../../domain/model/User";
import { CreateIngredientDto } from "../../dtos/controller/CreateIngredientDto";


@injectable()
export class CreateIngredientUseCase {
  constructor(@inject('IngredientRepository') private ingredientRepository: IngredientRepository) {}

  public async execute(dto: CreateIngredientDto, user: User): Promise<void> {
    const ingredient = Ingredient.fromPrimitives({...dto, user: user.id.value})
    await this.ingredientRepository.create(ingredient);
  }

}