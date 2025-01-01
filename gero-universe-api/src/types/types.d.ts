import * as express from "express";
import { IUserSession } from "../models/userModel";

// Extension of Request type of Express
declare global {
  namespace Express {
    interface Request {
      session: {
        user?: IUserSession;
      };
    }
  }
}
