import express from "express";
import ingredientsRoutes from "./routes/ingredientsRoutes";
import connectGeroUniverseYourChefDB from "./config/database";

// Declaration of the Your Chef app
const yourChefApp = express.Router();

// Connection to DB
connectGeroUniverseYourChefDB();

// Declaration of the routes of the app
yourChefApp.use("/ingredients", ingredientsRoutes);

export default yourChefApp;
