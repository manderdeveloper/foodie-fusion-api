import { CreateDishDto } from "@application/dtos/controller/CreateDishDto";
import { Dish } from "@domain/model/Dish";
import { User } from "@domain/model/User";
import { DishRepository } from "@domain/repository/DishIngredient";
import { IngredientRepository } from "@domain/repository/IngredientRepository";
import { inject, injectable } from "inversify";



@injectable()
export class CreateDishUseCase {
  constructor(
    @inject('DishRepository') private dishRepository: DishRepository,
    @inject('IngredientRepository') private ingredientRepository: IngredientRepository
  ) {}

  public async execute(dto: CreateDishDto, user: User): Promise<void> {
    const dtoIngredients = dto.ingredients;
    const ingredients = await this.ingredientRepository.getAll(); //TODO: Search ingredients by id;
    const dish = Dish.fromPrimitives({...dto, ingredients: ingredients, user: user.id.value})
    await this.dishRepository.create(dish);
  }

}