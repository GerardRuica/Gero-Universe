import { Request, Response } from "express";
import Ingredient, { IIngredient } from "../models/ingredientModel";
import { ERRORS } from "../../../constants/errors";

class IngredientController {
  /**
   * Creates an ingredient with data from request
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   */
  public async createIngredient(req: Request, res: Response): Promise<void> {
    try {
      let ingredient: IIngredient = req.body;
      const ingredientId = req.body.name.trim().toLowerCase().replace(/\s+/g, "_");
      ingredient = { ...ingredient, identifier: ingredientId };
      const newIngredient = new Ingredient(ingredient);
      await newIngredient.save();
      res.status(200).send();
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: error.message, code: "ERROR_VALIDATION" });
      } else if (error.name === "MongoServerError" && error.code == ERRORS.MONGO.DUPLICATE_KEY.code_number) {
        res.status(ERRORS.MONGO.DUPLICATE_KEY.status).send({
          message: `${ERRORS.MONGO.DUPLICATE_KEY.message} ${JSON.stringify(error.keyValue)}`,
          code: ERRORS.MONGO.DUPLICATE_KEY.code,
        });
      } else {
        res.status(500).send({ message: "Error saving ingredient" });
      }
    }
  }

  /**
   * Function to get all ingredients from DB
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   */
  public async getAllIngredients(req: Request, res: Response): Promise<void> {
    try {
      const ingredients = await Ingredient.find().select("-__v");
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredients" });
    }
  }

  /**
   * Function to delete an ingredient by id
   *
   * @param req Express request with ingredient id
   * @param res Express response
   */
  public async deleteIngredientById(req: Request, res: Response): Promise<void> {
    try {
      const ingredientId: string = req.params.id;
      const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientId);
      if (!deletedIngredient) {
        res.status(404).json({ message: "Ingredient not found" });
      } else {
        res.status(200).json({ message: "Ingredient deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error when delete an ingredient" });
    }
  }
}

export default IngredientController;
