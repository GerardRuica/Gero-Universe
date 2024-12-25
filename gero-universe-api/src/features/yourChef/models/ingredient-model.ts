const mongoose = require("mongoose");

// Definition of DB Schema of ingredients
export const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  unit: { type: String },
  photo: { type: String },
});

// Interface creation of Ingredients
export interface Ingredient {
  name: string;
  description?: string;
  type: string;
  unit?: string;
  photo?: string;
}
