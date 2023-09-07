import { Request, Response, NextFunction } from 'express';
import { container } from '../../../dependency-injection/containerBase';
import { Logger } from './Logger';

export function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const logger = container.get<Logger>('Logger');
  if (error.isHandled === true) {
    logger.info(JSON.stringify(error.message));
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
  } else {    
    logger.error(JSON.stringify(error.message));
    res.status(500).json({
      error: {
        message: 'Internal server error',
      },
    });
  }
}