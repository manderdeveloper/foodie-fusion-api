import mongoose, { Schema, Document } from 'mongoose';

export interface DishDocument extends Document {
  id: string,
  name: string,
  ingredients: string[],
  type: string,
  description: string,
  recipe: string,
  code: string,
  user: string,
}

const dishSchema = new Schema<DishDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  ingredients: [{ type: String}],
  type: { type: String, required: true },
  description: { type: String, required: true },
  recipe: { type: String, required: true },
  code: { type: String, required: true },
  user: { type: String, required: true }
});

export const DishModel = mongoose.model<DishDocument>('Dish', dishSchema);