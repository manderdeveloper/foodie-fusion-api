import "reflect-metadata";
import container from "../../../../../src/dependency-injection/container";
import { InversifyExpressServer } from "inversify-express-utils";
import request from 'supertest';

const server = new InversifyExpressServer(container, null, {rootPath: ''});
const app = server.build();

describe('Health Controller Integration Test', () => {
  it('Should check the server', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
  })
});