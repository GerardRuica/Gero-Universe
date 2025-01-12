import mongoose from "mongoose";

export const geroUniverseDBConnection = mongoose.createConnection(
  `mongodb://${process.env.DB_CONNECTION}/gero-universe?authSource=admin`
);
