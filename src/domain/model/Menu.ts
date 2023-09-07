import { MenuId } from "@domain/valueobject/menu/MenuId";
import { InvalidArgumentError } from "@domain/valueobject/primitives/InvalidArgumentError";
import { UserId } from "@domain/valueobject/user/UserId";
import { Meal } from "./Meal";
import { Week } from "./Week";


export class Menu {

  readonly id: MenuId;
  readonly user: UserId;
  week: Week;
  meals: Meal[];

  constructor(id: MenuId, user: UserId, week: Week, meals: Meal[]) {
    if (meals.length !== 7) throw new InvalidArgumentError('Invalid meals for prepare the menu');
    this.id = id;
    this.user = user;
    this.week = week;
    this.meals = meals;
  }

  static fromPrimitives(plainData: {id: string, user: UserId, week: Week, meals: Meal[]}) {
    return new Menu(
      new MenuId(plainData.id),
      plainData.user,
      plainData.week,
      plainData.meals
    )
  }

  toPrimitives() {
    const primitiveMeals = this.meals.map(meal => meal.toPrimitives());
    return {
      id: this.id.value,
      user: this.user.value,
      week: `${this.week.number.value} - ${this.week.year.value}`,
      meals: primitiveMeals
    }
  }
}