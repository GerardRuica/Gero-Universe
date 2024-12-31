import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware toi verify if user is authenticated or not
const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.session = { user: null };

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

    req.session.user = data;

    next();
  } catch (error: any) {
    if (error.name == "JsonWebTokenError") {
      res
        .status(401)
        .send({ message: `Authentication error: user not logged` });
    } else {
      res.status(401).send({ message: `Auth Error: ${error.message}` });
    }
  }
};

export default isAuthenticated;
