import express from "express";
import ingredientsRoutes from "./routes/ingredientRoutes";

// Declaration of the Your Chef app
const yourChefApp = express.Router();

// Declaration of the routes of the app
yourChefApp.use("/ingredients", ingredientsRoutes);

export default yourChefApp;
