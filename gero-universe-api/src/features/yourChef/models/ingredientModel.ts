import { geroUniverseYourChefDBConnection } from "../config/geroUniverseYourChefDatabase";
import mongoose, { Types } from "mongoose";

// Declaration of the ingredient interface
export interface IIngredient {
  _id: Types.ObjectId[];
  name: string;
  identifier: string;
  description?: string;
  type: string;
  unit: string;
  icon: string;
}

// Declaration of ingredient schema
export const IngredientSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingredient name is required"],
    unique: true,
  },
  identifier: {
    type: String,
    required: [true, "Ingredient identifier is required"],
    unique: true,
  },
  description: { type: String },
  type: {
    type: String,
    required: [true, "Ingredient type is required"],
  },
  unit: { type: String },
  icon: { type: String },
});

const Ingredient: mongoose.Model<any> = geroUniverseYourChefDBConnection.model("Ingredient", IngredientSchema);

export default Ingredient;
