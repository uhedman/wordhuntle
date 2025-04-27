import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB connection error:", error.message);
    } else {
      console.error("❌ MongoDB connection error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
