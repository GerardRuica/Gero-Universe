import express, { Request, Response } from "express";
import connectGeroUniverseYourChefDB from "./features/yourChef/config/database";
import mongoose from "mongoose";
import {
  Ingredient,
  IngredientSchema,
} from "./features/yourChef/models/ingredient-model";
import appRoutes from "./routes/appRoutes";

const cors = require("cors");
const app = express();
const port: number = 3000;

// Middleware for managing JSON requests
app.use(express.json());
// To accept CORS
app.use(cors());
// App routes
app.use("/", appRoutes);
// Port assignation
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/*
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript API!");
});

app.get("/api", (req: Request, res: Response) => {
  console.log("Api works");
  res.json({ message: "Hello from API in TypeScript!" });
});

app.post("/ingredients", async (req: Request, res: Response) => {
  try {
    connectGeroUniverseYourChefDB();

    const ingredient: Ingredient = req.body as Ingredient;
    console.log(ingredient);

    
    const kittySchema = new mongoose.Schema({
      name: String,
    });

    const Kitten = mongoose.model("Kitten", kittySchema);
    const silence = new Kitten({ name: "Silence" });
    await silence.save();
    

    res.status(201).json("Request done successfully");
  } catch (error) {
    console.error("Error when add an ingredient", error);
    res.status(500).json({ error: "Error when add an ingredient." });
  }
});
*/
