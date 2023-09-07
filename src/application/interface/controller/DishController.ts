import { CreateDishDto } from "@application/dtos/controller/CreateDishDto";
import { CreateDishUseCase } from "@application/usecase/dish/CreateDishUseCase";
import { ListDishUseCase } from "@application/usecase/dish/ListDishUseCase";
import { CreateDishValidator } from "@application/validator/controller/CreateDishValidator";
import { UserRequest } from "@shared/model/Request";
import { USECASETYPES } from "@shared/type/UseCaseTypes";
import { Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { validationAuthMiddleware } from "../middleware/Auth";
import { validationHttpMiddleware } from "../middleware/HttpValidation";



@controller('/api/dishes')
export class DishController {
  constructor (
    @inject(USECASETYPES.CreateDishUseCase) private createDishUseCase: CreateDishUseCase,
    @inject(USECASETYPES.ListDishUseCase) private listDishUseCase: ListDishUseCase
  ) { }

  @httpPost('/', validationAuthMiddleware(), validationHttpMiddleware(CreateDishValidator.validateCreateDish()))
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const dto: CreateDishDto = req.body;
      await this.createDishUseCase.execute(dto, req.user);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/', validationAuthMiddleware())
  async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      
      const ingredients = await this.listDishUseCase.execute(req.user);
      return res.status(200).json(ingredients)

    } catch (error) {
      next (error)
    }
  }
}