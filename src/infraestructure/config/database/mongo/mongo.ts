import mongoose, { ConnectOptions } from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;
const mongooseOptions = {
  useNewUrlParser: true
};
export async function initializeMongoDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'foodie-fusion-local'
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}