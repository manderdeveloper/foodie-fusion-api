import { Ingredient } from "@domain/model/Ingredient";
import { IngredientRepository } from "@domain/repository/IngredientRepository";
import { injectable } from "inversify";

@injectable()
export class InMemoryIngredientRepository implements IngredientRepository {
  
  private ingredients : Ingredient[] = [];

  getAll(): Promise<Ingredient[]> {
    return Promise.resolve(this.ingredients);
  }

  getAllIngredientsByUser(userId: string) {
    const ingredients = this.ingredients.filter(ingredient => ingredient.user.value === userId);
    return Promise.resolve(ingredients || []);
  }

  getById(id: string): Promise<Ingredient | null> {
    const ingredient = this.ingredients.find(ingredient => ingredient.id.value === id);
    return Promise.resolve(ingredient || null);
  }

  create(model: Ingredient): Promise<void> {
    this.ingredients.push(model);
    return Promise.resolve();
  }

  update(model: Ingredient): Promise<void> {
    const index = this.ingredients.findIndex((ingredient) => ingredient.id.value === model.id.value);
    if (index === -1) {
      this.ingredients[index] = model;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.ingredients.findIndex((ingredient) => ingredient.id.value === id);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
    return Promise.resolve();
  }

}