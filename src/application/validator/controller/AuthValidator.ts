import { body } from 'express-validator';

class AuthValidator {
  public static validateLoginBody() {
    return [
      body('email').notEmpty().isEmail(),
      body('password').notEmpty().isString()
    ];
  }
}

export { AuthValidator };
