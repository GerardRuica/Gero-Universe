import { Request, Response } from "express";
import { ERRORS } from "../constants/errors";
import User, { IUser } from "../models/userModel";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/authUtils";

/**
 * Class to manage user functions
 */
class UserController {
  /** Session time to allow to use user session and cookie */
  static readonly SESSION_TIME_H: number = 2;

  /**
   * Function to login a user
   *
   * @param {Request} req Express req. Expects a body with email and password of the user
   * @param {Response} res Express response
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const introducedUser: IUser = req.body;
      const user: IUser | null = await User.findOne({
        email: introducedUser.email,
      });

      const invalidCredentialsError: createError.HttpError<number> =
        createError(
          ERRORS.USER.INVALID_CREDENTIALS.status,
          ERRORS.USER.INVALID_CREDENTIALS.message,
          { code: ERRORS.USER.INVALID_CREDENTIALS.code }
        );

      if (!user) throw invalidCredentialsError;

      const validPassword: boolean = await bcrypt.compare(
        introducedUser.password,
        user.password
      );

      if (!validPassword) throw invalidCredentialsError;

      const token: string = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: `${UserController.SESSION_TIME_H}h` }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: UserController.SESSION_TIME_H * 60 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        .send({
          userId: user._id,
          username: user.username,
          token: token,
        });
    } catch (error: any) {
      this.handleError(error, res, "Error when login");
    }
  }

  /**
   * Function to register an user
   *
   * @param {Request} req Express req. Expects a body with username, email and password of the user
   * @param {Response} res Express response
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const introducedUser: IUser = req.body;
      this.validateUserData(introducedUser);

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
      console.log(error);
      this.handleError(error, res, "Error when register");
    }
  }

  /**
   * Function to logout an user
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   */
  public async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("access_token").json({ message: "Logout successful" });
    } catch (error: any) {
      this.handleError(error, res, "Error when logout");
    }
  }

  /**
   * Function to check user token
   *
   * @param {Request} req Express request
   * @param {Response} res Express response
   */
  public async checkToken(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.cookies.access_token;
      if (!token) {
        throw createError(
          ERRORS.USER.NOT_PROVIDED_TOKEN.status,
          ERRORS.USER.NOT_PROVIDED_TOKEN.message,
          { code: ERRORS.USER.NOT_PROVIDED_TOKEN.code }
        );
      }

      res.json({ valid: !!verifyToken(token) });
    } catch (error: any) {
      this.handleError(error, res, "Error when check token");
    }
  }

  /**
   * Function to handle errors and send appropriate response.
   *
   * @param {Error} error The error object thrown
   * @param {Response} res The Express response object
   * @param {String} defaultErrorMessage Default error message of the error
   */
  public handleError = (
    error: any,
    res: Response,
    defaultErrorMessage: string
  ): void => {
    const errorCodes: string[] = [
      ERRORS.USER.INVALID_CREDENTIALS.code,
      ERRORS.USER.NOT_PROVIDED_TOKEN.code,
      ERRORS.USER.INVALID_TOKEN.code,
      ERRORS.USER.REGISTERED_EMAIL.code,
      ERRORS.USER.INVALID_EMAIL.code,
      ERRORS.USER.INVALID_PASSWORD.code,
    ];

    const errorCode: string = String(error.code);
    if (errorCodes.includes(errorCode)) {
      res.status(error.status).send({ message: error.message, name: "error" });
    } else {
      res.status(500).send({ message: defaultErrorMessage, name: "error" });
    }
  };

  /**
   * Validate user data
   *
   * @param {IUser} user User to validate
   */
  private validateUserData(user: IUser): void {
    // We create a regex for email (xxx@xxx.xxx)
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      throw createError(
        ERRORS.USER.INVALID_EMAIL.status,
        ERRORS.USER.INVALID_EMAIL.message,
        { code: ERRORS.USER.INVALID_EMAIL.code }
      );
    }

    // We create a regex for password (min 8 character, 1 letter and 1 num)
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!user.password || !passwordRegex.test(user.password)) {
      throw createError(
        ERRORS.USER.INVALID_PASSWORD.status,
        ERRORS.USER.INVALID_PASSWORD.message,
        { code: ERRORS.USER.INVALID_PASSWORD.code }
      );
    }
  }
}

export default UserController;
