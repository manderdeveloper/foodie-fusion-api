import { LoginDto } from "@application/dtos/controller/LoginDto";
import { AuthService } from "@application/service/AuthService";
import { AuthValidator } from "@application/validator/controller/AuthValidator";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { validationHttpMiddleware } from "../../middleware/HttpValidation";



@controller('/v1/auth')
export class AuthController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost('/login', validationHttpMiddleware(AuthValidator.validateLoginBody()))
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: LoginDto = req.body;
      const token = await this.authService.login(dto);
      res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  }
}