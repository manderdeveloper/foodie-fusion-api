import { inject, injectable } from "inversify";
import { DishRepository } from "../../../domain/repository/DishIngredient";
import { Dish } from "../../../domain/model/Dish";
import { User } from "../../../domain/model/User";


@injectable()
export class CreateDishUseCase {
  constructor(@inject('DishRepository') private dishRepository: DishRepository) {}

  public async execute(body: any, user: User): Promise<void> {
    const dish = Dish.fromPrimitives({...body, user: user.id.value})
    await this.dishRepository.create(dish);
  }

}