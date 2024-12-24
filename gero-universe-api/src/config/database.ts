import mongoose from "mongoose";

const connectGeroUniverseDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/gero-universe"
    );
    console.log("Connected to DB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectGeroUniverseDB;
