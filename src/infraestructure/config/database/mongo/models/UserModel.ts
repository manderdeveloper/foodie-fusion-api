import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  id: string;
  email: string;
  name: string;
  lastname: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
});
 
export const UserModel = mongoose.model<UserDocument>('User', userSchema);