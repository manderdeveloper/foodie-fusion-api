import FoodType from '@domain/model/FoodType';
import { faker } from '@faker-js/faker';
import { generateIngredient } from '../ingredient/IngredientFixture';
import { Ingredient } from '@domain/model/Ingredient';

export function generateDish() {
  const uuid = faker.string.uuid();
  const name = faker.word.noun();
  const largeText = faker.word.words({ count: { min: 10, max: 20 } });
  const type = faker.helpers.enumValue(FoodType)
  const ingredients = generateIngredient().id;

  return {
    id: uuid,
    name: name,
    description: largeText,
    recipe: largeText,
    type: type,
    ingredients: [ingredients]
  }
}