import express, { Request, Response, Router } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ERRORS } from "../constants/errors";
import createError from "http-errors";

// Declaration of the user routes
const userRoutes: Router = express.Router();

// Function to authenticate an user
userRoutes.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: IUser = req.body;
      const user: IUser | null = await User.findOne({ email });
      const invalidCredentialsError: createError.HttpError<number> =
        createError(
          ERRORS.USER.INVALID_CREDENTIALS.status,
          ERRORS.USER.INVALID_CREDENTIALS.message,
          { code: ERRORS.USER.INVALID_CREDENTIALS.code }
        );

      if (!user) throw invalidCredentialsError;

      const validPassword: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) throw invalidCredentialsError;

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
      handleError(error, res, "Error when login");
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
        throw createError(
          ERRORS.USER.REGISTERED_EMAIL.status,
          ERRORS.USER.REGISTERED_EMAIL.message,
          { code: ERRORS.USER.REGISTERED_EMAIL.code }
        );
      }

      const hashedPassword: string = await bcrypt.hash(
        introducedUser.password,
        10
      );

      introducedUser.password = hashedPassword;
      const newUser = new User(introducedUser);
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      handleError(error, res, "Error when register");
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
      handleError(error, res, "Error when logout");
    }
  }
);

/**
 * Function to handle errors and send appropriate response.
 *
 * @param {Error} error The error object thrown
 * @param {Response} res The Express response object
 * @param {String} defaultErrorMessage Default error message of the error
 */
function handleError(
  error: any,
  res: Response,
  defaultErrorMessage: String
): void {
  const errorCodes: string[] = [ERRORS.USER.INVALID_CREDENTIALS.code];

  const errorCode: string = String(error.code);
  if (errorCodes.includes(errorCode)) {
    res.status(error.status).send({ message: error.message });
  } else {
    res.status(500).send({ message: defaultErrorMessage });
  }
}

export default userRoutes;
