import express, { Request, Response, Router } from "express";
import Ingredient from "../models/ingredientModel";

// Routes declaration
const ingredientsRoutes: Router = express.Router();

// Function to get an ingredient
ingredientsRoutes.get(
  "/getIngredients",
  async (req: Request, res: Response) => {
    try {
      const ingredients = await Ingredient.find().select("-__v");
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredients" });
    }
  }
);

// Function to add a new ingredient to DB
ingredientsRoutes.post(
  "/addIngredient",
  async (req: Request, res: Response) => {
    try {
      const newIngredient = new Ingredient(req.body);
      await newIngredient.save();
      res.send(200);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: error.message });
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(400).send({
          message: `Error: duplicate key on ${JSON.stringify(error.keyValue)}`,
        });
      } else {
        res.status(500).send({ message: "Error saving ingredient" });
      }
    }
  }
);

ingredientsRoutes.put("/:id", async (req: Request, res: Response) => {});

ingredientsRoutes.delete("/:id", (req: Request, res: Response) => {});

export default ingredientsRoutes;
