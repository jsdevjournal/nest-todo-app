import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const getDb = async () => {
  const db = mongoose.connect(process.env.DATABASE_URL);
  return db;
};

