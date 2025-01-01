import { Request, Response, NextFunction } from "express";
import User, { IUser, IUserSession } from "../models/userModel";
import Permission, { IPermission } from "../models/permissionsModel";
import createError from "http-errors";
import { ERRORS } from "../constants/errors";

/**
 * Checks user permissions
 *
 * @param permissionsNames Permissions names
 */
const checkPermission =
  (permissionsNames: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userPermissions: String[] = await getUserPermissions(
        req.session.user as IUserSession
      );

      const requiredPermissions: String[] = await getPermissionsByNames(
        permissionsNames
      );

      const hasPermissions: boolean = requiredPermissions.some(
        (permission: String) => userPermissions.includes(permission)
      );

      if (!hasPermissions) {
        throw createError(
          ERRORS.PERMISSIONS.DENIED.status,
          ERRORS.PERMISSIONS.DENIED.message,
          {
            code: ERRORS.PERMISSIONS.DENIED.code,
          }
        );
      }

      next();
    } catch (error: any) {
      if (error.code === "PERMISSION_DENIED") {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: `Error when obtain permissions` });
      }
    }
  };

/**
 * Function to get user data by user session
 *
 * @param {IUserSession} userSession User session
 * @returns User permissions
 */
async function getUserPermissions(
  userSession: IUserSession
): Promise<String[]> {
  try {
    const user: Partial<IUser> = (await User.findById(userSession.userId)
      .select("permissions")
      .populate("permissions", "name")) as Partial<IUser>;

    if (!user) {
      throw createError(404, "User not found", {
        code: "USER_NOT_FOUND",
      });
    }

    const userPermissions: String[] = (user.permissions as IPermission[]).map(
      (perm: IPermission) => perm.name
    );

    return userPermissions;
  } catch (error: any) {
    throw error;
  }
}

/**
 * Function to get id of the permissions by name of the permissions
 *
 * @param {string[]} names Permissions names
 * @returns Name of the permissions
 */
async function getPermissionsByNames(names: string[]): Promise<String[]> {
  try {
    const permissions: Partial<IPermission>[] = await Permission.find({
      name: { $in: names },
    }).select("name");

    const foundPermissions: (String | undefined)[] = permissions.map(
      (perm: Partial<IPermission>) => perm.name
    );

    if (names.length !== foundPermissions.length)
      throw Error("One of the indicates permissions don't exist");

    return foundPermissions as String[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default checkPermission;
