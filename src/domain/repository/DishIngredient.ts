import { Dish } from '../model/Dish';
import { BaseRepository } from './BaseRepository';

export interface DishRepository extends BaseRepository<Dish> {
  getAllDishesByUser(userId: string): Promise<Dish[]>;
  getAllLaunchesByUser(userId: string): Promise<Dish[]>;
  getAllDinnersByUser(userId: string): Promise<Dish[]>;

}
