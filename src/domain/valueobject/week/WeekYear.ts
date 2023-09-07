import { InvalidArgumentError } from "../primitives/InvalidArgumentError";
import { NumberValueObject } from "../primitives/NumberValueObject";

export class WeekYear extends NumberValueObject {
  constructor(number: number) {
    super(number);
    this.isValidYear(number);
  }

  private isValidYear(number: number) {
    const currentYear = new Date().getFullYear();
    if (number < currentYear) {
      throw new InvalidArgumentError(`${this.constructor.name} - Year is not valid`)
    }
  }
}