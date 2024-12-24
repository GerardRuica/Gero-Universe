import mongoose from "mongoose";

const connectGeroUniverseYourChefDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      "mongodb://admin:admin@localhost:27017/gero-universe-your-chef?authSource=admin"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectGeroUniverseYourChefDB;
