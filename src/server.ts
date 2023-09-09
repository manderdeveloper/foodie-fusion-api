import 'reflect-metadata';
import 'module-alias/register'

const environment = process.env.NODE_ENV === 'development' ? 'dev': process.env.NODE_ENV;
require('dotenv').config({ path: `./environments/${environment}.env` })

import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorHandlerMiddleware } from '@application/interface/middleware/ErrorHandler';
import container from '@dependency-injection/container';

const server = new InversifyExpressServer(container, null, {rootPath: '/api'});

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

export default app;
