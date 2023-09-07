import { id, inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { User } from "../../../domain/model/User";
import { IngredientRepository } from "../../../domain/repository/IngredientRepository";
import { INITIAL_INGREDIENTS } from "../../../infraestructure/config/IngredientsInitialization";
import { Ingredient } from "../../../domain/model/Ingredient";
import { UuidValueObject } from "../../../domain/valueobject/primitives/UuidValueObject";
import { INITIAL_DISHES } from "../../../infraestructure/config/DishesInitialization";
import { Dish } from "../../../domain/model/Dish";
import { DishRepository } from "../../../domain/repository/DishIngredient";
import { CreateUserDto } from "../../dtos/controller/CreateUserDto";
import { body } from "express-validator";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('IngredientRepository') private ingredientRepository: IngredientRepository,
    @inject('DishRepository') private dishRepository: DishRepository
  ) {}

  public async execute(dto: CreateUserDto): Promise<any> {
    const user = User.fromPrimitives({...dto});
    await this.userRepository.create(user);
    const initalIngredients = INITIAL_INGREDIENTS;
    for (let rawIngredient of initalIngredients) {
      const ingredient = Ingredient.fromPrimitives({id: UuidValueObject.random().value ,name: rawIngredient.name, isMain: rawIngredient.isMain, user: user.id.value})
      await this.ingredientRepository.create(ingredient);
    }

    const initialDishes = INITIAL_DISHES;
    for (let rawDish of initialDishes) {
      const dish = Dish.fromPrimitives({id: UuidValueObject.random().value, name: rawDish.name, ingredients: [], type: rawDish.type, description: rawDish.description, recipe:rawDish.recipe, user: user.id.value})
      await this.dishRepository.create(dish);
    }
  }

}