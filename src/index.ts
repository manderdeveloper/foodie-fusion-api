import 'reflect-metadata';
import 'module-alias/register'

import app from './server';
const environment = process.env.NODE_ENV === 'development' ? 'dev': process.env.NODE_ENV;
require('dotenv').config({ path: `./environments/${environment}.env` })

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
}

