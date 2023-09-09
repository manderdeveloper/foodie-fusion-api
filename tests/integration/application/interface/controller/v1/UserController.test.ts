
import { CreateUserDto } from "@application/dtos/controller/CreateUserDto";
import { generateUser } from "@tests/integration/fixtures/user/UserFixtures";
import request from 'supertest';
import server from 'src/server';


describe('User Controller Integration Test', () => {
  it('Should create a user', async () => {
    const body : CreateUserDto = generateUser();
    const response = await request(server).post('/api/v1/users').set({[process.env.ADMIN_API_KEY]: process.env.ADMIN_API_KEY_VALUE}).send(body);
    expect(response.status).toBe(201);
  })

  it('Should return a list of user', async () => {
    const response = await request(server).get('/api/v1/users').set({[process.env.ADMIN_API_KEY]: process.env.ADMIN_API_KEY_VALUE});
    expect(response.status).toBe(200);
  })
});