import { faker } from '@faker-js/faker';

export function generateIngredient() {
  const uuid = faker.string.uuid();
  const name = faker.word.noun();
  const boolean = faker.datatype.boolean(0.7);

  return {
    id: uuid,
    name: name,
    isMain: boolean
  }
}