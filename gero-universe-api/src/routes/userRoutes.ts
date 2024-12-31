import express, { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

// Declaration of the user routes
const userRoutes = express.Router();

// Function to authenticate an user
userRoutes.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: IUser = req.body;

      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid email or password");

      const validPassword: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) throw new Error("Invalid email or password");

      const token: string = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, //TODO: Hacerla true en produccion, e sa decir que solo se pueda usar https
          maxAge: 24000 * 60 * 60, //TODO: cambiar la validez de la cookie a unas pocas horas,
          sameSite: true,
        })
        .send({
          userId: user._id,
          username: user.username,
          token: token,
        });
    } catch (error: any) {
      res.status(401).send({ message: `Error login user: ${error.message}` });
    }
  }
);

// Function to register an user
userRoutes.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const introducedUser: IUser = req.body;
      const existingUser: IUser | null = await User.findOne({
        email: introducedUser.email,
      });

      if (existingUser) throw new Error("Email already registered");

      const hashedPassword: string = await bcrypt.hash(
        introducedUser.password,
        10
      );

      introducedUser.password = hashedPassword;
      const newUser = new User(introducedUser);
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res
        .status(400)
        .send({ message: `Error creating user: ${error.message}` });
    }
  }
);

// Function to close session of an user
userRoutes.post(
  "/logout",
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("access_token").json({ message: "Logout successful" });
    } catch (error: any) {
      res.status(400).send({ message: `Error when logout: ${error.message}` });
    }
  }
);

// Function to access to protected routes
userRoutes.get(
  "/protected",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const token: string = req.cookies.access_token;
      if (!token) throw new Error("Access not authorized");

      const data: JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
    } catch (error: any) {
      res.status(401).send({ message: `Error when access: ${error.message}` });
    }
  }
);

export default userRoutes;
