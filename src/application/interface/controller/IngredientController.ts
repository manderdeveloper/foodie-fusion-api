import { CreateIngredientDto } from "@application/dtos/controller/CreateIngredientDto";
import { CreateIngredientUseCase } from "@application/usecase/ingredient/CreateIngredientUseCase";
import { ListIngredientUseCase } from "@application/usecase/ingredient/ListIngredientUseCase";
import { CreateIngredientValidator } from "@application/validator/controller/CreateIngredientValidator";
import { UserRequest } from "@shared/model/Request";
import { USECASETYPES } from "@shared/type/UseCaseTypes";
import { Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { validationAuthMiddleware } from "../middleware/Auth";
import { validationHttpMiddleware } from "../middleware/HttpValidation";


@controller('/api/ingredients')
export class IngredientController {
  constructor (
    @inject(USECASETYPES.CreateIngredientUseCase) private createIngredientUseCase: CreateIngredientUseCase,
    @inject(USECASETYPES.ListIngredientUseCase) private listIngredientUseCase: ListIngredientUseCase
  ) { }

  @httpPost('/', validationAuthMiddleware(), validationHttpMiddleware(CreateIngredientValidator.validateCreateIngredient()))
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const dto: CreateIngredientDto = req.body;
      await this.createIngredientUseCase.execute(dto, req.user);
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