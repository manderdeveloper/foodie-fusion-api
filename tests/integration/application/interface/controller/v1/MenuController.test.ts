
import request from 'supertest';
import server from 'src/server';
import { container } from "@dependency-injection/containerBase";
import { UserRepository } from "@domain/repository/UserRepository";
import { LoginFactory } from "@tests/factory/user/FactoryLogin";
import { AuthService } from "@application/service/AuthService";
import { CreateMenuDto } from '@application/dtos/controller/CreateMenuDto';
import { generateMenu } from '@tests/fixtures/menu/MenuFixture';
import { DishRepository } from '@domain/repository/DishIngredient';
import { IngredientRepository } from '@domain/repository/IngredientRepository';
import { MenuFactory } from '@tests/factory/menu/FactoryMenu';

let token: string;
let tokenWithDishes: string;

describe('Menu Controller Integration Test', () => {
  beforeAll(async () => {
    const loginFactory = new LoginFactory(
      container.get<UserRepository>('UserRepository'), 
      container.get<AuthService>('AuthService'));
    token = await loginFactory.createUserWithToken();

    const menuFactory = new MenuFactory(
      container.get<UserRepository>('UserRepository'), 
      container.get<IngredientRepository>('IngredientRepository'),
      container.get<DishRepository>('DishRepository'), 
      container.get<AuthService>('AuthService'));
    tokenWithDishes = await menuFactory.createUserWithMinimunDishes();

  });

  it('Should create a menu with error not enough plates', async () => {
    const body : CreateMenuDto = generateMenu();
    const response = await request(server).post('/api/v1/menus').set({'Authorization': `Bearer ${token}`}).send(body);
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Not enough launches');
  })

  it('Should create a menu and retrieve it', async () => {
    const body : CreateMenuDto = generateMenu();
    const createResponse = await request(server).post('/api/v1/menus').set({'Authorization': `Bearer ${tokenWithDishes}`}).send(body);
    expect(createResponse.status).toBe(201);
    const retrieveReponse = await request(server).get(`/api/v1/menus/${body.id}`).set({'Authorization': `Bearer ${tokenWithDishes}`});
    expect(retrieveReponse.status).toBe(200);
  })

  it('Should return a list of menu', async () => {
    const response = await request(server).get('/api/v1/menus').set({'Authorization': `Bearer ${token}`});
    expect(response.status).toBe(200);
  })
});