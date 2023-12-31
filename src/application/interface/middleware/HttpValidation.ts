import { BadRequestError } from '@shared/error/BadRequestError';
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';


function validationHttpMiddleware(validations: ValidationChain[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      next (new BadRequestError(JSON.stringify(errors.array())));
    }
  };
}

export { validationHttpMiddleware };
