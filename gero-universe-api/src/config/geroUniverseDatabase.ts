import mongoose from "mongoose";

export const geroUniverseDBConnection = mongoose.createConnection(
  "mongodb://admin:admin@localhost:27017/gero-universe?authSource=admin"
);

/*const connectGeroUniverseDB = async (): Promise<void> => {
  try {
    /*const geroUniverseConnection: mongoose.Connection =
      await mongoose.createConnection(
        "mongodb://admin:admin@localhost:27017/gero-universe?authSource=admin"
      );

    const geroUniverseYouChefConnection: mongoose.Connection =
      await mongoose.createConnection(
        "mongodb://admin:admin@localhost:27017/gero-universe-your-chef?authSource=admin"
      );
    console.log("Connected to DB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectGeroUniverseDB;*/
