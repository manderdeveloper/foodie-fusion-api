import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";


@controller('/v1/health')
export class HealthController {
  constructor(
  ) {}

  @httpGet('/')
  async health(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({message: 'Ready'});

    } catch (error) {
      next(error);
    }
  }
}