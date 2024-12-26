import mongoose from "mongoose";
import { geroUniverseYourChefDBConnection } from "../config/geroUniverseYourChefDatabase";

// Declaration of ingredient schema
export const IngredientSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingredient name is required"],
    unique: true,
  },
  description: { type: String },
  type: {
    type: String,
    required: [true, "Ingredient type is required"],
  },
  unit: { type: String },
  photo: { type: String },
});

const Ingredient: mongoose.Model<any> = geroUniverseYourChefDBConnection.model(
  "Ingredient",
  IngredientSchema
);

export default Ingredient;
