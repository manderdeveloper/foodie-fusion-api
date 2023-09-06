import { Response, NextFunction } from "express";
import { container } from "../../../infraestructure/dependency-injection/containerBase";
import { AuthService } from "../../service/AuthService";
import { ForbiddenError } from "../../../shared/error/ForbiddenError";
import { UserRequest } from "../../../shared/model/Request";

function validationAuthMiddleware() {
  return async function (req: UserRequest, res: Response, next: NextFunction) {
    const authService = container.get<AuthService>('AuthService');
    const token = req.headers.authorization?.split(' ')[1];
      if (!token) return new ForbiddenError();
      try {
        const user = await authService.validateAuthToken(token);
        req.user = user;
        next();
      } catch (error) {
        next(new ForbiddenError());
      }
  };
}

export { validationAuthMiddleware };
