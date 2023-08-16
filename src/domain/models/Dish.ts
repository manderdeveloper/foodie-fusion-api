import { DishId } from "../valueObjects/dish/DishId";
import { DishName } from "../valueObjects/dish/DishName";
import { Ingredient } from "./Ingredient";



export class Dish {
  readonly id: DishId;
  readonly name: DishName;
  readonly ingredients: Ingredient[]
}