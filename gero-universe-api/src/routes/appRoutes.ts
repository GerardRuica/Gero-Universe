import express, { Request, Response } from "express";
import yourChefApp from "../features/yourChef/yourChefApp";

// Declaration of the app routes
const appRoutes = express.Router();

// Routes assignation
appRoutes.use("/your-chef", yourChefApp);

export default appRoutes;
