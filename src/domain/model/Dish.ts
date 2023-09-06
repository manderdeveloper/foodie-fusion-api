import { DishId } from "../valueobject/dish/DishId";
import { DishName } from "../valueobject/dish/DishName";
import { Ingredient } from "./Ingredient";

export class Dish {
  readonly id: DishId;
  readonly name: DishName;
  readonly ingredients: Ingredient[]
  
  constructor (id: DishId, name: DishName, ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }

  static fromPrimitives(plainData: { id: string, name: string, ingredients: Ingredient[]}): Dish {
    return new Dish(
      new DishId(plainData.id),
      new DishName(plainData.name),
      plainData.ingredients
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      ingredients: this.ingredients
    };
  }

}