import express, { Request, Response } from "express";
import connectGeroUniverseDB from "./config/database";
import connectGeroUniverseYourChefDB from "./features/your-chef/config/database";
import mongoose, { Model } from "mongoose";
import ingredientSchema from "./features/your-chef/models/ingredient-model";

const app = express();
const port = 3000;

// Middleware for managing JSON requests
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript API!");
});

app.get("/api", (req: Request, res: Response) => {
  console.log("Api works");
  res.json({ message: "Hello from API in TypeScript!" });
});

app.post("/ingredients", async (req: Request, res: Response) => {
  try {
    console.log("Request body: ", req.body);
    connectGeroUniverseYourChefDB();

    const userSchema: mongoose.Schema = new mongoose.Schema({
      name: String,
      age: Number,
    });

    mongoose.model("test3", userSchema);
    const user = new Model({
      name: "Test",
      age: 20,
    });

    user.save();

    res.status(201).json("Request done successfully");
  } catch (error) {
    console.error("Error when add an ingredient", error);
    res.status(500).json({ error: "Error when add an ingredient." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
