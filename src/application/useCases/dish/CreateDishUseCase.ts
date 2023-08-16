import { inject, injectable } from "inversify";
import { DishRepository } from "../../../domain/repositories/DishIngredient";
import { Dish } from "../../../domain/models/Dish";


@injectable()
export class CreateDishUseCase {
  constructor(@inject('DishRepository') private dishRepository: DishRepository) {}

  public async execute(body: any): Promise<void> {
    const dish = Dish.fromPrimitives({...body})
    await this.dishRepository.create(dish);
  }

}