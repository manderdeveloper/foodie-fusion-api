import { User } from "@domain/model/User";
import { DishRepository } from "@domain/repository/DishIngredient";
import { inject, injectable } from "inversify";


@injectable()
export class ListDishUseCase {
  constructor(@inject('DishRepository') private dishRepository: DishRepository) {}

  public async execute(user: User): Promise<any> {
    const dishes = await this.dishRepository.getAllDishesByUser(user.id.value);
    return dishes.map(dish => dish.toPrimitives());
  }

}