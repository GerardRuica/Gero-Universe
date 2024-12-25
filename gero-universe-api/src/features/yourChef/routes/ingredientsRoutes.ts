import express, { Request, Response, Router } from "express";
import { Ingredient, IngredientSchema } from "../models/ingredient-model";

// Routes declaration
const ingredientsRoutes: Router = express.Router();

ingredientsRoutes.get("/", (req: Request, res: Response) => {
  console.log("A");
  res.send({ message: "Lista de ingredientes" });
});

ingredientsRoutes.post("/", (req: Request, res: Response) => {});

ingredientsRoutes.put("/:id", (req: Request, res: Response) => {});

ingredientsRoutes.delete("/:id", (req: Request, res: Response) => {});

export default ingredientsRoutes;
