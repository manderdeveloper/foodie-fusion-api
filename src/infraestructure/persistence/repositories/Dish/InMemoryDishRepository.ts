import { injectable } from "inversify";
import { Dish } from "../../../../domain/model/Dish";
import { DishRepository } from "../../../../domain/repository/DishIngredient";

@injectable()
export class InMemoryDishRepository implements DishRepository {
  
  private dishes : Dish[] = [];

  getAll(): Promise<Dish[]> {
    return Promise.resolve(this.dishes);
  }

  getById(id: string): Promise<Dish | null> {
    const dish = this.dishes.find(dish => dish.id.value === id);
    return Promise.resolve(dish || null);
  }

  create(model: Dish): Promise<void> {
    this.dishes.push(model);
    return Promise.resolve();
  }

  update(model: Dish): Promise<void> {
    const index = this.dishes.findIndex((dish) => dish.id.value === model.id.value);
    if (index === -1) {
      this.dishes[index] = model;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.dishes.findIndex((dish) => dish.id.value === id);
    if (index !== -1) {
      this.dishes.splice(index, 1);
    }
    return Promise.resolve();
  }

}