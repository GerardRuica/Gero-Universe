import express, { Router } from "express";
import UserController from "../controllers/userController";

// User controller instance to manage user actions
const userController = new UserController();

// Declaration of the user routes
const userRoutes: Router = express.Router();

// Endpoint to authenticate an user
userRoutes.post("/login", userController.login);
// Endpoint to register an user
userRoutes.post("/register", userController.register);
// Endpoint to close session of an user
userRoutes.get("/logout", userController.logout);
// Endpoint to check if user token is valid or not
userRoutes.get("/checkToken", userController.checkToken);

export default userRoutes;
