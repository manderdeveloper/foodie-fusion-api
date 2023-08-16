import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { CreateIngredientUseCase } from "../../application/useCases/ingredient/CreateIngredientUseCase";
import { NextFunction, Request, Response } from "express";
import { ListIngredientUseCase } from "../../application/useCases/ingredient/ListIngredientUseCase";


@controller('/api/ingredients')
export class IngredientController {
  constructor (
    @inject(USECASETYPES.CreateIngredientUseCase) private createIngredientUseCase: CreateIngredientUseCase,
    @inject(USECASETYPES.ListIngredientUseCase) private listIngredientUseCase: ListIngredientUseCase
  ) { }

  @httpPost('/')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await this.createIngredientUseCase.execute(body);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/')
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      
      const ingredients = await this.listIngredientUseCase.execute();
      return res.status(200).json(ingredients)

    } catch (error) {
      next (error)
    }
  }
}