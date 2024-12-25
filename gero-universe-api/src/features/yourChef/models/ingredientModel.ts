import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
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

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;
