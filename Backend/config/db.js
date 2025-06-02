import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB Connected");
  } catch (error) {
    console.log("error while connecting to MONGODB");
  }
}
