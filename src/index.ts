import 'reflect-metadata';
const environment = process.env.NODE_ENV === 'development' ? 'dev': process.env.NODE_ENV;
require('dotenv').config({ path: `./environments/${environment}.env` })
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './injection/container'
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { errorHandlerMiddleware } from './interfaces/middlewares/ErrorHandler';

const server = new InversifyExpressServer(container, null, {rootPath: ''});

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
});

server.setErrorConfig((app) => {
  app.use((error:any, req:any, res:any, next:any) => {
    errorHandlerMiddleware(error, req, res, next);
  });
});

const app = server.build();
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

export {app}
