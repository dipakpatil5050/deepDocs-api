import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable in .env.development/production.local file "
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully......");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDatabase;
