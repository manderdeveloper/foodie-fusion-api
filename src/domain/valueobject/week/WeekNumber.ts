import { InvalidArgumentError } from "../primitives/InvalidArgumentError";
import { NumberValueObject } from "../primitives/NumberValueObject";

export class WeekNumber extends NumberValueObject {
  constructor(number: number) {
    super(number);
    this.isValidWeek(number);
  }

  private isValidWeek(number: number) {
    if (number < 1 && number > 53) {
      throw new InvalidArgumentError(`${this.constructor.name} - Week number is not valid`)
    }
  }
}