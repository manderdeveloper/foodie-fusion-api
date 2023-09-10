
import request from 'supertest';
import server from 'src/server';
import { container } from "@dependency-injection/containerBase";
import { UserRepository } from "@domain/repository/UserRepository";
import { LoginFactory } from "@tests/factory/user/FactoryLogin";
import { AuthService } from "@application/service/AuthService";
import { CreateDishDto } from "@application/dtos/controller/CreateDishDto";
import { generateDish } from "@tests/fixtures/dish/DishFixture";

let token: string;

describe('Dish Controller Integration Test', () => {
  beforeAll(async () => {
    const loginFactory = new LoginFactory(
      container.get<UserRepository>('UserRepository'), 
      container.get<AuthService>('AuthService'));
    token = await loginFactory.createUserWithToken();
  });

  it('Should create a dish', async () => {
    const body : CreateDishDto = generateDish();
    const response = await request(server).post('/api/v1/dishes').set({'Authorization': `Bearer ${token}`}).send(body);
    expect(response.status).toBe(201);
  })

  it('Should return a list of dishes', async () => {
    const response = await request(server).get('/api/v1/dishes').set({'Authorization': `Bearer ${token}`});
    expect(response.status).toBe(200);
  })
});