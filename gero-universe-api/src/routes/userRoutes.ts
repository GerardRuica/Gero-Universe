import express, { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Declaration of the user routes
const userRoutes = express.Router();

// Function to authenticate an user
userRoutes.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: IUser = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
      } else {
        const validPassword: boolean = await bcrypt.compare(
          password,
          user.password
        );

        if (validPassword) {
          const token: string = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "24h" }
          );

          res.json({ token });
        } else {
          res.status(400).json({ message: "Invalid email or password" });
        }
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: "Error login user" });
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

      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
      } else {
        const hashedPassword: string = await bcrypt.hash(
          introducedUser.password,
          10
        );

        introducedUser.password = hashedPassword;
        const newUser = new User(introducedUser);
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: "Error creating user" });
    }
  }
);

export default userRoutes;
