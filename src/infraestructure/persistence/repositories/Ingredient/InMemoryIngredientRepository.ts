import { Ingredient } from "@domain/model/Ingredient";
import { InMemoryBaseRepository } from "../Base/InMemoryBaseRepository";
import { injectable } from "inversify";


@injectable()
export class InMemoryIngredientRepository extends InMemoryBaseRepository<Ingredient> {
  getAllIngredientsByUser(userId: string) {
    const ingredients = this.items.filter(items => items.user.value === userId);
    return Promise.resolve(ingredients || []);
  }
}