import { Dish } from '../model/Dish';
import { BaseRepository } from './BaseRepository';

export interface DishRepository extends BaseRepository<Dish> {
}