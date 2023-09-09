import _shuffle from 'lodash/shuffle';
import { injectable } from "inversify";
import { Dish } from '@domain/model/Dish';
import FoodType from '@domain/model/FoodType';
import { InMemoryBaseRepository } from '../Base/InMemoryBaseRepository';

@injectable()
export class InMemoryDishRepository extends InMemoryBaseRepository<Dish> {
  getAllDishesByUser(userId: string) {
    const dishes = this.items.filter(dish => dish.user.value === userId);
    return Promise.resolve(dishes || []);
  }

  getAllLaunchesByUser(userId: string): Promise<Dish[]> {
    let dishes = this.items.filter(dish => dish.user.value === userId && [FoodType.BOTH.toString(), FoodType.LAUNCH.toString()].includes(dish.type.value));
    return Promise.resolve(_shuffle(dishes) || []);
  }
  getAllDinnersByUser(userId: string): Promise<Dish[]> {
    let dishes = this.items.filter(dish => dish.user.value === userId && [FoodType.BOTH.toString(), FoodType.DINNER.toString()].includes(dish.type.value));
    return Promise.resolve(_shuffle(dishes) || []);
  }
}