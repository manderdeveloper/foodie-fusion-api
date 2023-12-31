import { UuidValueObject } from "@domain/valueobject/primitives/UuidValueObject";
import { WeekId } from "@domain/valueobject/week/WeekId";
import { WeekNumber } from "@domain/valueobject/week/WeekNumber";
import { WeekYear } from "@domain/valueobject/week/WeekYear";


export class Week {
   
  readonly id: WeekId;
  number: WeekNumber;
  year: WeekYear;

  constructor(id: WeekId, number: WeekNumber, year: WeekYear) {
    this.id = id;
    this.number = number;
    this.year = year;
  }

  static fromPrimitives(plainData: {number: number, year: number}) {
    return new Week(
      new WeekId(UuidValueObject.random().value),
      new WeekNumber(plainData.number),
      new WeekYear(plainData.year)
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      number: this.number.value,
      year: this.year.value
    }
  }
}