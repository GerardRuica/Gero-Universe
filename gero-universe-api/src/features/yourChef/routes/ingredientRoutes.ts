import express, { Request, Response, Router } from "express";
import IngredientController from "../controllers/ingredientController";

// Ingredient controller to manager ingredient actions
const ingredientController: IngredientController = new IngredientController();

// Declaration of the ingredients routes
const ingredientsRoutes: Router = express.Router();

// Endpoint to get all ingredients from DB
ingredientsRoutes.get("/getIngredients", (req, res) => ingredientController.getAllIngredients(req, res));
// Endpoint ot create an ingredient
ingredientsRoutes.post("/addIngredient", (req, res) => ingredientController.createIngredient(req, res));
ingredientsRoutes.put("/:id", async (req: Request, res: Response) => {});
/** Endpoint to delete an ingredient by id */
ingredientsRoutes.delete("/:id", (req: Request, res: Response) => ingredientController.deleteIngredientById(req, res));

export default ingredientsRoutes;
