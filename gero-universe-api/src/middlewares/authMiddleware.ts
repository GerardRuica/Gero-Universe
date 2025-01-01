import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserSession } from "../models/userModel";

/**
 * Middleware to verify if user is authenticated or not
 *
 * @param {Request} req Http request
 * @param {Response} res Http response
 * @param {NextFunction} next Next function
 */
const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.session = {};

    const excludedRoutes: string[] = [
      "/user/login",
      "/user/register",
      "/user/logout",
      "/public",
    ];

    // We exclude this routes
    if (excludedRoutes.includes(req.path)) {
      return next();
    }

    const token: any = req.cookies.access_token;
    const data: JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.session.user = data as IUserSession;

    next();
  } catch (error: any) {
    if (error.name == "JsonWebTokenError") {
      res
        .status(401)
        .send({ message: `Authentication error: user not logged` });
    } else {
    }
  }
};

export default isAuthenticated;
