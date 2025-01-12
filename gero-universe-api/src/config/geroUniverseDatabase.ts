import mongoose from "mongoose";

export const geroUniverseDBConnection = mongoose.createConnection(
  String(process.env.GERO_UNIVERSE_DB_CONNECTION)
);
