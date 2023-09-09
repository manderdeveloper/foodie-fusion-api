import { IngredientId } from "@domain/valueobject/ingredient/IngredientId";
import { IngredientIsMain } from "@domain/valueobject/ingredient/IngredientIsMain";
import { IngredientName } from "@domain/valueobject/ingredient/IngredientName";
import { UserId } from "@domain/valueobject/user/UserId";
import { Searchable } from "./Searchable";


export class Ingredient implements Searchable {
  readonly id: IngredientId;
  readonly name: IngredientName;
  readonly isMain: IngredientIsMain;
  readonly user: UserId;

  constructor (id: IngredientId, name: IngredientName, isMain: IngredientIsMain, user: UserId) {
    this.id = id;
    this.name = name;
    this.isMain = isMain;
    this.user = user;
  }

  static fromPrimitives(plainData: { id: string, name: string, isMain: boolean, user:string}): Ingredient {
    return new Ingredient(
      new IngredientId(plainData.id),
      new IngredientName(plainData.name),
      new IngredientIsMain(plainData.isMain),
      new UserId(plainData.user)
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