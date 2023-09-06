import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { USECASETYPES } from "../../../shared/type/UseCaseTypes";
import { NextFunction, Request, Response } from "express";
import { CreateDishUseCase } from "../../usecase/dish/CreateDishUseCase";
import { ListDishUseCase } from "../../usecase/dish/ListDishUseCase";
import { validationAuthMiddleware } from "../middleware/Auth";
import { UserRequest } from "../../../shared/model/Request";


@controller('/api/dishes')
export class DishController {
  constructor (
    @inject(USECASETYPES.CreateDishUseCase) private createDishUseCase: CreateDishUseCase,
    @inject(USECASETYPES.ListDishUseCase) private listDishUseCase: ListDishUseCase
  ) { }

  @httpPost('/', validationAuthMiddleware())
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.createDishUseCase.execute(body, req.user);
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