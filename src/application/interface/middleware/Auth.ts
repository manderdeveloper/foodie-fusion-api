import { Response, NextFunction, Request } from 'express';
import { ForbiddenError } from '../../../shared/error/ForbiddenError';

function validationAdminApiKey() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.headers[process.env.ADMIN_API_KEY.toLowerCase()];
      if (!apiKey) throw new ForbiddenError();
      if (apiKey !== process.env.ADMIN_API_KEY_VALUE) throw new ForbiddenError();
      next();  
    } catch (error) {
      next(error);
    }
    
  };
}

export { validationAdminApiKey };
