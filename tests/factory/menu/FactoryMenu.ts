import { inject } from 'inversify';
import { UserRepository } from '@domain/repository/UserRepository';
import { User } from '@domain/model/User';
import { generateUser } from '@tests/fixtures/user/UserFixture';
import { AuthService } from '@application/service/AuthService';
import { LoginDto } from '@application/dtos/controller/LoginDto';
import { Dish } from '@domain/model/Dish';
import { Ingredient } from '@domain/model/Ingredient';
import { UuidValueObject } from '@domain/valueobject/primitives/UuidValueObject';
import { INITIAL_DISHES } from '@infraestructure/config/DishesInitialization';
import { INITIAL_INGREDIENTS } from '@infraestructure/config/IngredientsInitialization';
import { DishRepository } from '@domain/repository/DishIngredient';
import { IngredientRepository } from '@domain/repository/IngredientRepository';

export class MenuFactory {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('IngredientRepository') private ingredientRepository: IngredientRepository,
    @inject('DishRepository') private dishRepository: DishRepository,
    @inject('AuthService') private authService: AuthService
    ) {
  }

  async createUserWithMinimunDishes(): Promise<string> {
    const fixtureUser = generateUser();
    await this.userRepository.create(await User.fromPrimitives(fixtureUser));
    await this.generateMinimunMenu(fixtureUser.id);
    const token = await this.authService.login(fixtureUser as LoginDto);
    return token;
  }

  private async generateMinimunMenu (userId: string): Promise<void> {
    const initalIngredients = INITIAL_INGREDIENTS;
    for (let rawIngredient of initalIngredients) {
      const ingredient = Ingredient.fromPrimitives({id: UuidValueObject.random().value ,name: rawIngredient.name, isMain: rawIngredient.isMain, user: userId})
      await this.ingredientRepository.create(ingredient);
    }

    const initialDishes = INITIAL_DISHES;
    for (let rawDish of initialDishes) {
      const dish = Dish.fromPrimitives({id: UuidValueObject.random().value, name: rawDish.name, ingredients: [], type: rawDish.type, description: rawDish.description, recipe:rawDish.recipe, user: userId})
      await this.dishRepository.create(dish);
    }
  }
}



  