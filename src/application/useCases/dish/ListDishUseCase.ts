import { inject, injectable } from "inversify";
import { DishRepository } from "../../../domain/repositories/DishIngredient";

@injectable()
export class ListDishUseCase {
  constructor(@inject('DishRepository') private dishRepository: DishRepository) {}

  public async execute(): Promise<any> {
    const dishes = await this.dishRepository.getAll()
    return dishes.map(dish => dish.toPrimitives());
  }

}