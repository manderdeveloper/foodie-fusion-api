import { faker } from '@faker-js/faker';
import { getISOWeek } from 'date-fns';

export function generateMenu() {
  const uuid = faker.string.uuid();
  const soonDate = faker.date.soon({days: 7})
  const weekYear = soonDate.getFullYear();
  const weekNumber = getISOWeek(soonDate)

  return {
    id: uuid,
    weekNumber: weekNumber, 
    weekYear: weekYear
  }
}