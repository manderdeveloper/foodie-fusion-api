import { IngredientId } from "../valueobject/ingredient/IngredientId";
import { IngredientIsMain } from "../valueobject/ingredient/IngredientIsMain";
import { IngredientName } from "../valueobject/ingredient/IngredientName";

export class Ingredient {
  readonly id: IngredientId;
  readonly name: IngredientName;
  readonly isMain: IngredientIsMain;

  constructor (id: IngredientId, name: IngredientName, isMain: IngredientIsMain) {
    this.id = id;
    this.name = name;
    this.isMain = isMain;
  }

  static fromPrimitives(plainData: { id: string, name: string, isMain: boolean}): Ingredient {
    return new Ingredient(
      new IngredientId(plainData.id),
      new IngredientName(plainData.name),
      new IngredientIsMain(plainData.isMain)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      isMain: this.isMain.value
    };
  }

}