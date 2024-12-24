const mongoose = require("mongoose");

// Define the Schema
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  unit: { type: String },
  photo: { type: String },
});

// Interface creation
export interface IIngredient extends Document {
  name: string;
  description?: string;
  type: string;
  unit?: string;
  photo?: string;
}

export default ingredientSchema;
