import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { AuthService } from "../../service/AuthService";
import { LoginDto } from "../../dtos/controller/LoginDto";
import { CreateIngredientValidator } from "../../validator/controller/CreateIngredientValidator";
import { validationHttpMiddleware } from "../middleware/HttpValidation";
import { AuthValidator } from "../../validator/controller/AuthValidator";


@controller('/api/auth')
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