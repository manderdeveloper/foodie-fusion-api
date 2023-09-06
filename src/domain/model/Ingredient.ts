import { IngredientId } from "../valueobject/ingredient/IngredientId";
import { IngredientName } from "../valueobject/ingredient/IngredientName";

export class Ingredient {
  readonly id: IngredientId;
  readonly name: IngredientName;

  constructor (id: IngredientId, name: IngredientName) {
    this.id = id;
    this.name = name;
  }

  static fromPrimitives(plainData: { id: string, name: string}): Ingredient {
    return new Ingredient(
      new IngredientId(plainData.id),
      new IngredientName(plainData.name)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value
    };
  }

}