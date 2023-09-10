import mongoose, { Schema, Document } from 'mongoose';

export interface IngredientDocument extends Document {
  id: string;
  name: string;
  isMain: boolean;
  user: string;
}

const ingredientSchema = new Schema<IngredientDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isMain: { type: Boolean, required: true },
  user: { type: String, required: true }
});

export const IngredientModel = mongoose.model<IngredientDocument>('Ingredient', ingredientSchema);