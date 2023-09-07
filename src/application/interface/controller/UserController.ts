import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { USECASETYPES } from "../../../shared/type/UseCaseTypes";
import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../usecase/user/CreateUserCase";
import { ListUserUseCase } from "../../usecase/user/ListUserUseCase";
import { validationAdminApiKey } from "../middleware/ApiKey";
import { CreateUserDto } from "../../dtos/controller/CreateUserDto";
import { validationHttpMiddleware } from "../middleware/HttpValidation";
import { CreateUserValidator } from "../../validator/controller/CreateUserValidator";


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