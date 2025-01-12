import mongoose from "mongoose";

export const geroUniverseYourChefDBConnection = mongoose.createConnection(
  String(process.env.YOUR_CHEF_DB_CONNECTION)
);
