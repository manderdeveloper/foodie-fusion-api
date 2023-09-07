import { body, param } from 'express-validator';

class MenuValidator {
  public static validateCreateMenu() {
    return [
      body('id').notEmpty().isUUID(),
      body('weekNumber').notEmpty().isNumeric(),
      body('weekYear').notEmpty().isNumeric()
    ];
  }

  public static validateRetrieveMenu() {
    return [
      param('id').notEmpty().isUUID()
    ]
  }
}

export { MenuValidator };
