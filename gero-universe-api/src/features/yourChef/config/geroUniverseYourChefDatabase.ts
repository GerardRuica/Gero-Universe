import mongoose from "mongoose";

export const geroUniverseYourChefDBConnection = mongoose.createConnection(
  "mongodb://admin:admin@localhost:27017/gero-universe-your-chef?authSource=admin"
);
