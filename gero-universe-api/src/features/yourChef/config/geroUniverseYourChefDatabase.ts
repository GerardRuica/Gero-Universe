import mongoose from "mongoose";

export const geroUniverseYourChefDBConnection = mongoose.createConnection(
  `mongodb://${process.env.DB_CONNECTION}/gero-universe-your-chef?authSource=admin`
);
