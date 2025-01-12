import express, { Router } from "express";
import UserController from "../controllers/userController";

// User controller instance to manage user actions
const userController: UserController = new UserController();

// Declaration of the user routes
const userRoutes: Router = express.Router();

// Endpoint to authenticate an user
userRoutes.post("/login", (req, res) => userController.login(req, res));
// Endpoint to register an user
userRoutes.post("/register", (req, res) => userController.register(req, res));
// Endpoint to close session of an user
userRoutes.get("/logout", (req, res) => userController.logout(req, res));
// Endpoint to check if user token is valid or not
userRoutes.get("/checkToken", (req, res) =>
  userController.checkToken(req, res)
);

export default userRoutes;
