import express, { Request, Response } from "express";
import yourChefApp from "../features/yourChef/yourChefApp";
import userRoutes from "./userRoutes";

// Declaration of the app routes
const appRoutes = express.Router();

// Routes assignation
appRoutes.use("/your-chef", yourChefApp);
appRoutes.use("/user", userRoutes);

export default appRoutes;
