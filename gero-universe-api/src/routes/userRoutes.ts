import express, { Request, Response, Router } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ERRORS } from "../constants/errors";
import createError from "http-errors";
import { verifyToken } from "../utils/authUtils";

// Declaration of the user routes
const userRoutes: Router = express.Router();

// Max time of the session
const SESSION_TIME_H: number = 1;

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
        { expiresIn: `${SESSION_TIME_H}h` }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, //TODO: Hacerla true en produccion, es a decir que solo se pueda usar https
          maxAge: SESSION_TIME_H * 60 * 60,
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

// Function to check if user token is valid or not
userRoutes.post("/checkToken", (req: Request, res: Response): void => {
  try {
    const { token }: IUser = req.body;
    if (!token) {
      throw createError(
        ERRORS.USER.NOT_PROVIDED_TOKEN.status,
        ERRORS.USER.NOT_PROVIDED_TOKEN.message,
        { code: ERRORS.USER.NOT_PROVIDED_TOKEN.code }
      );
    }

    res.json({ valid: !!verifyToken(token) });
  } catch (error: any) {
    handleError(error, res, "Error when check token");
  }
});

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
  const errorCodes: string[] = [
    ERRORS.USER.INVALID_CREDENTIALS.code,
    ERRORS.USER.NOT_PROVIDED_TOKEN.code,
    ERRORS.USER.INVALID_TOKEN.code,
  ];

  const errorCode: string = String(error.code);
  if (errorCodes.includes(errorCode)) {
    res.status(error.status).send({ message: error.message });
  } else {
    res.status(500).send({ message: defaultErrorMessage });
  }
}

export default userRoutes;
