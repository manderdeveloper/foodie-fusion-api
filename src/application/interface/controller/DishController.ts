import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { USECASETYPES } from "../../../shared/type/UseCaseTypes";
import { NextFunction, Request, Response } from "express";
import { CreateDishUseCase } from "../../usecase/dish/CreateDishUseCase";
import { ListDishUseCase } from "../../usecase/dish/ListDishUseCase";


@controller('/api/dishes')
export class DishController {
  constructor (
    @inject(USECASETYPES.CreateDishUseCase) private createDishUseCase: CreateDishUseCase,
    @inject(USECASETYPES.ListDishUseCase) private listDishUseCase: ListDishUseCase
  ) { }

  @httpPost('/')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.createDishUseCase.execute(body);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/')
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      
      const ingredients = await this.listDishUseCase.execute();
      return res.status(200).json(ingredients)

    } catch (error) {
      next (error)
    }
  }
}