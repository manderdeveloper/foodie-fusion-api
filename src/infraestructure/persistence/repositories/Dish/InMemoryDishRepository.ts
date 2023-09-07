import { injectable } from "inversify";
import { Dish } from "../../../../domain/model/Dish";
import { DishRepository } from "../../../../domain/repository/DishIngredient";
import FoodType from "../../../../domain/model/FoodType";
import _shuffle from 'lodash/shuffle';

@injectable()
export class InMemoryDishRepository implements DishRepository {
  
  private dishes : Dish[] = [];

  getAll(): Promise<Dish[]> {
    return Promise.resolve(this.dishes);
  }

  getAllDishesByUser(userId: string) {
    const dishes = this.dishes.filter(dish => dish.user.value === userId);
    return Promise.resolve(dishes || []);
  }

  getAllLaunchesByUser(userId: string): Promise<Dish[]> {
    let dishes = this.dishes.filter(dish => dish.user.value === userId && [FoodType.BOTH.toString(), FoodType.LAUNCH.toString()].includes(dish.type.value));
    return Promise.resolve(_shuffle(dishes) || []);
  }
  getAllDinnersByUser(userId: string): Promise<Dish[]> {
    let dishes = this.dishes.filter(dish => dish.user.value === userId && [FoodType.BOTH.toString(), FoodType.DINNER.toString()].includes(dish.type.value));
    return Promise.resolve(_shuffle(dishes) || []);
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