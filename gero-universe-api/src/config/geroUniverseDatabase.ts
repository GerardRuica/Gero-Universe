import mongoose from "mongoose";

export const geroUniverseDBConnection = mongoose.createConnection(
  "mongodb://admin:admin@localhost:27017/gero-universe?authSource=admin"
);
