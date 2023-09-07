import { Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, next } from "inversify-express-utils";
import { UserRequest } from "../../../shared/model/Request";
import { USECASETYPES } from "../../../shared/type/UseCaseTypes";
import { CreateMenuDto } from "../../dtos/controller/CreateMenuDto";
import { CreateMenuUseCase } from "../../usecase/menu/CreateMenuUseCase";
import { MenuValidator } from "../../validator/controller/MenuValidator";
import { validationAuthMiddleware } from "../middleware/Auth";
import { validationHttpMiddleware } from "../middleware/HttpValidation";
import { RetrieveMenuUseCase } from "../../usecase/menu/RetrieveMenuUseCase";
import { ListMenuUseCase } from "../../usecase/menu/ListMenuUseCase";


@controller('/api/menus')
export class MenuController {
  constructor (
    @inject(USECASETYPES.CreateMenuUseCase) private createMenuUseCase: CreateMenuUseCase,
    @inject(USECASETYPES.RetrieveMenuUseCase) private retrieveMenuUseCase: RetrieveMenuUseCase,
    @inject(USECASETYPES.ListMenuUseCase) private listMenuUseCase: ListMenuUseCase,
    
  ) { }

  @httpPost('/', validationAuthMiddleware(), validationHttpMiddleware(MenuValidator.validateCreateMenu()))
  async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const dto: CreateMenuDto = req.body;
      await this.createMenuUseCase.execute(dto, req.user);
      return res.status(201).json({message: 'Created'})

    } catch (error) {
      next (error)
    }
  }

  @httpGet('/:id', validationAuthMiddleware(), validationHttpMiddleware(MenuValidator.validateRetrieveMenu()))
  async retrieve(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const menu = await this.retrieveMenuUseCase.execute(id, req.user)
      return res.status(200).json(menu)
    } catch (error) {
      next(error)
    }
  }
  
  @httpGet('/', validationAuthMiddleware())
  async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const menus = await this.listMenuUseCase.execute(req.user)
      return res.status(200).json(menus)
    } catch (error) {
      next(error)
    }
  }
  
}