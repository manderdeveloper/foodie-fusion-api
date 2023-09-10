import { faker } from '@faker-js/faker';

export function generateUser() {
  const uuid = faker.string.uuid();
  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  //const password = faker.internet.password();
  const password = "Ejemplo.12"
  return {
    id: uuid,
    name: name,
    lastname: lastName,
    email: email,
    password: password
  }
}