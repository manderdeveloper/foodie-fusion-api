import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { BadRequestError } from '../../../shared/error/BadRequestError';

function validationHttpMiddleware(validations: ValidationChain[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      next (new BadRequestError(errors.array().join('')));
    }
  };
}

export { validationHttpMiddleware };
