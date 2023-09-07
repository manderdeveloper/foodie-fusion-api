import { body } from 'express-validator';
import FoodType from '../../../domain/model/FoodType';

class CreateDishValidator {
  public static validateCreateDish() {
    return [
      body('id').notEmpty().isUUID(),
      body('name').notEmpty().isString(),
      body('type').notEmpty().isIn(Object.values(FoodType)),
      body('description').notEmpty().isString(),
      body('recipe').notEmpty().isString(),
      body('ingredients').notEmpty().isArray({min: 1})
    ];
  }
}

export { CreateDishValidator };
