import { MealDayOfWeek } from "../valueobject/meal/MealDayOfWeek";
import { MealId } from "../valueobject/meal/MealId";
import { InvalidArgumentError } from "../valueobject/primitives/InvalidArgumentError";
import { UuidValueObject } from "../valueobject/primitives/UuidValueObject";
import { Dish } from "./Dish";
import FoodType from "./FoodType";


export class Meal {
  readonly id: MealId;
  dayOfWeek: MealDayOfWeek;
  launch: Dish;
  dinner: Dish;

  constructor(id: MealId, dayOfWeek: MealDayOfWeek, launch: Dish, dinner: Dish) {
    if (![FoodType.LAUNCH.toString(), FoodType.BOTH.toString()].includes(launch.type.value) ) throw new InvalidArgumentError('Not valid launch')
    if (![FoodType.DINNER.toString(), FoodType.BOTH.toString()].includes(dinner.type.value) ) throw new InvalidArgumentError('Not valid dinner')
    
    this.id = id;
    this.dayOfWeek = dayOfWeek;
    this.launch = launch;
    this.dinner = dinner;
  }

  static fromPrimitives(plainData: {dayOfWeek: string, launch: Dish, dinner: Dish}) {
    return new Meal(
      new MealId(UuidValueObject.random().value),
      new MealDayOfWeek(plainData.dayOfWeek),
      plainData.launch,
      plainData.dinner
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      dayOfWeek: this.dayOfWeek.value,
      launch: this.launch.name.value,
      dinner: this.dinner.name.value
    }
  }
}