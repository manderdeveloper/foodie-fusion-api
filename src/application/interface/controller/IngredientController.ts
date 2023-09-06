import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { USECASETYPES } from "../../../shared/type/UseCaseTypes";
import { CreateIngredientUseCase } from "../../usecase/ingredient/CreateIngredientUseCase";
import { NextFunction, Request, Response } from "express";
import { ListIngredientUseCase } from "../../usecase/ingredient/ListIngredientUseCase";
import { UserRequest } from "../../../shared/model/Request";
import { validationAuthMiddleware } from "../middleware/Auth";


@controller('/api/ingredients')
export class IngredientController {
  constructor (
    @inject(USECASETYPES.CreateIngredientUseCase) private createIngredientUseCase: CreateIngredientUseCase,
    @inject(USECASETYPES.ListIngredientUseCase) private listIngredientUseCase: ListIngredientUseCase
  ) { }

  @httpPost('/', validationAuthMiddleware())
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.createIngredientUseCase.execute(body, req.user);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/', validationAuthMiddleware())
  async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      
      const ingredients = await this.listIngredientUseCase.execute(req.user);
      return res.status(200).json(ingredients)

    } catch (error) {
      next (error)
    }
  }
}