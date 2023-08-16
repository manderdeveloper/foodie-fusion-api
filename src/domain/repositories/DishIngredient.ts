import { Dish } from '../models/Dish';
import { BaseRepository } from './BaseRepository';

export interface DishRepository extends BaseRepository<Dish> {
}
