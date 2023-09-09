
import { generateUser } from "@tests/integration/fixtures/user/UserFixtures";
import request from 'supertest';
import server from 'src/server';
import { UserFactory } from "@tests/integration/factory/user/FactoryUser";
import { User } from "@domain/model/User";
import { container } from "@dependency-injection/containerBase";
import { LoginDto } from "@application/dtos/controller/LoginDto";
import { UserRepository } from "@domain/repository/UserRepository";

let fixtureUser: any;
let user: User;

describe('Auth Controller Integration Test', () => {
  beforeAll(async () => {
    const userFactory = new UserFactory(container.get<UserRepository>('UserRepository'));
    fixtureUser = generateUser();
    user = await userFactory.createUserAndSave(fixtureUser);
  });

  it('Should login a user', async () => {
    const body: LoginDto = {
      email: fixtureUser.email,
      password: fixtureUser.password,
    }
    const response = await request(server).post('/api/v1/auth/login').send(body);
    expect(response.status).toBe(200);
  })

});

UserFactory