import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";
import { ERRORS } from "../constants/errors";

/**
 * Function to verifies if access token is valid or not
 *
 * @param accessToken Access token to verify
 * @returns Access token data if is valid token
 */
export function verifyToken(accessToken: string): JwtPayload | string {
  try {
    return jwt.verify(accessToken, process.env.JWT_SECRET as string);
  } catch (error) {
    throw createError(
      ERRORS.USER.INVALID_TOKEN.status,
      ERRORS.USER.INVALID_TOKEN.message,
      {
        code: ERRORS.USER.INVALID_TOKEN.code,
      }
    );
  }
}

export function registerUser(
  username: string,
  email: string,
  password: string
) {}
