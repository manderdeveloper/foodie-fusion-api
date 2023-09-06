import { DishCode } from "../valueobject/dish/DishCode";
import { DishDescription } from "../valueobject/dish/DishDescription";
import { DishId } from "../valueobject/dish/DishId";
import { DishName } from "../valueobject/dish/DishName";
import { DishRecipe } from "../valueobject/dish/DishRecipe";
import { DishType } from "../valueobject/dish/DishType";
import { UuidValueObject } from "../valueobject/primitives/UuidValueObject";
import { UserId } from "../valueobject/user/UserId";
import { Ingredient } from "./Ingredient";

export class Dish {
  readonly id: DishId;
  readonly name: DishName;
  readonly ingredients: Ingredient[];
  readonly type: DishType;
  readonly description: DishDescription;
  readonly recipe: DishRecipe;
  readonly code: DishCode;
  readonly user: UserId;
  
  constructor (id: DishId, name: DishName, ingredients: Ingredient[], type: DishType, description: DishDescription, recipe: DishRecipe, code: DishCode, user: UserId) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.type = type;
    this.description = description;
    this.recipe = recipe;
    this.code = code;
    this.user = user;

  }

  static fromPrimitives(plainData: { id: string, name: string, ingredients: Ingredient[], type: string, description: string, recipe: string, user: string}): Dish {
    return new Dish(
      new DishId(plainData.id),
      new DishName(plainData.name),
      plainData.ingredients,
      new DishType(plainData.type),
      new DishDescription(plainData.description),
      new DishRecipe(plainData.recipe),
      new DishCode(UuidValueObject.random().value),
      new UserId(plainData.user),
    )
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      ingredients: this.ingredients,
      type: this.type.value,
      description: this.description.value,
      recipe: this.recipe.value,
      code: this.code.value
    };
  }

}