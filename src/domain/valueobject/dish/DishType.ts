import { StringValueObject } from "../primitives/StringValueObject";
import FoodType from "../../model/FoodType";
import { InvalidArgumentError } from "../primitives/InvalidArgumentError";


export class DishType extends StringValueObject {
  constructor(type: string) {
    super(type);
    this.isValidType(type);
  }

  private isValidType(type: string) {
    const foodValues = Object.values(FoodType);
    if (!foodValues.includes(type as FoodType)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${type}>`);
    }
  }
}