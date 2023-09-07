import { body } from 'express-validator';

class CreateIngredientValidator {
  public static validateCreateIngredient() {
    return [
      body('id').notEmpty().isUUID(),
      body('name').notEmpty().isString(),
      body('isMain').notEmpty().isBoolean()
    ];
  }
}

export { CreateIngredientValidator };
