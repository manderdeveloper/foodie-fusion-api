import { Ingredient } from "@domain/model/Ingredient";
import { BaseRepository } from "./BaseRepository";


export interface IngredientRepository extends BaseRepository<Ingredient> {
  getAllIngredientsByUser(userId: string): Promise<Ingredient[]>
}
