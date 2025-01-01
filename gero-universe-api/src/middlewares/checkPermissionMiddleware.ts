import { Request, Response, NextFunction } from "express";
import User, { IUser, IUserSession } from "../models/userModel";
import Permission, { IPermission } from "../models/permissionsModel";
import createError from "http-errors";
import { ERRORS } from "../constants/errors";

/**
 * Checks user permissions
 *
 * @param permissionsNames Permissions names
 * @throws 403 If the user don't have permissions
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
      handleError(error, res);
    }
  };

/**
 * Function to get user data by user session
 *
 * @param {IUserSession} userSession User session
 * @returns User permissions
 * @throws 404 If user not exists
 */
async function getUserPermissions(
  userSession: IUserSession
): Promise<String[]> {
  try {
    const user: Partial<IUser> = (await User.findById(userSession.userId)
      .select("permissions")
      .populate("permissions", "name")) as Partial<IUser>;

    if (!user) {
      throw createError(
        ERRORS.USER.NOT_FOUND.status,
        ERRORS.USER.NOT_FOUND.message,
        {
          code: ERRORS.USER.NOT_FOUND.code,
        }
      );
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
 * @throws 404 if one of the introduced permissions names are not in DB
 */
async function getPermissionsByNames(names: string[]): Promise<String[]> {
  try {
    const permissions: Partial<IPermission>[] = await Permission.find({
      name: { $in: names },
    }).select("name");

    const foundPermissions: (String | undefined)[] = permissions.map(
      (perm: Partial<IPermission>) => perm.name
    );

    if (names.length !== foundPermissions.length) {
      throw createError(
        ERRORS.PERMISSIONS.NOT_FOUND.status,
        ERRORS.PERMISSIONS.NOT_FOUND.message,
        {
          code: ERRORS.PERMISSIONS.NOT_FOUND.code,
        }
      );
    }

    return foundPermissions as String[];
  } catch (error: any) {
    throw error;
  }
}

/**
 * Function to handle errors and send appropriate response.
 *
 * @param {Error} error The error object thrown
 * @param {Response} res The Express response object
 */
function handleError(error: any, res: Response): void {
  const errorCodes: string[] = [
    ERRORS.PERMISSIONS.DENIED.code,
    ERRORS.PERMISSIONS.NOT_FOUND.code,
    ERRORS.USER.NOT_FOUND.code,
  ];

  if (errorCodes.includes(error.code)) {
    res.status(error.status).send({ message: error.message });
  } else {
    res.status(500).send({ message: "Error when obtaining permissions" });
  }
}

export default checkPermission;
