import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUserSession } from "../models/userModel";
import { verifyToken } from "../utils/authUtils";
import { ERRORS } from "../constants/errors";

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

    // We exclude this routes, because otherwise a user would not be able to log in or register because they would not have a token.
    const excludedRoutes: string[] = ["/user/login", "/user/register"];
    if (excludedRoutes.includes(req.path)) {
      return next();
    }

    // We ignore when try to checkToken because data has been set on login
    if (req.path !== "/user/checkToken") {
      const data: JwtPayload | string = verifyToken(req.cookies.access_token);
      req.session.user = data as IUserSession;
    }

    next();
  } catch (error: any) {
    if (error.code === ERRORS.USER.INVALID_TOKEN.code) {
      res.status(error.status).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Error when validate authentication" });
    }
  }
};

export default isAuthenticated;
