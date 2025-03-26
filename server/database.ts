import config from "@config";
import mongoose from "mongoose";

const DATABASE_URI = config.database.host;
const DATABASE_USER = config.database.user;
const DATABASE_PASSWORD = config.database.password;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URI, {
      user: DATABASE_USER,
      pass: DATABASE_PASSWORD,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
