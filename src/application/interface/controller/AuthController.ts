import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { AuthService } from "../../service/AuthService";


@controller('/api/auth')
export class AuthController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost('/login')
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  }
}