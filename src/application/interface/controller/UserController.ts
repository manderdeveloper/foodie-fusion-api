import { CreateUserDto } from "@application/dtos/controller/CreateUserDto";
import { CreateUserUseCase } from "@application/usecase/user/CreateUserCase";
import { ListUserUseCase } from "@application/usecase/user/ListUserUseCase";
import { CreateUserValidator } from "@application/validator/controller/CreateUserValidator";
import { USECASETYPES } from "@shared/type/UseCaseTypes";
import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { validationAdminApiKey } from "../middleware/ApiKey";
import { validationHttpMiddleware } from "../middleware/HttpValidation";



@controller('/api/users')
export class UserController {
  constructor (
    @inject(USECASETYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(USECASETYPES.ListUserUseCase) private listUserUseCase: ListUserUseCase
  ) { }

  @httpPost('/', validationAdminApiKey(), validationHttpMiddleware(CreateUserValidator.validateCreateUser()))
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDto = req.body;
      await this.createUserUseCase.execute(dto);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/', validationAdminApiKey())
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      
      const ingredients = await this.listUserUseCase.execute();
      return res.status(200).json(ingredients)

    } catch (error) {
      next (error)
    }
  }
}