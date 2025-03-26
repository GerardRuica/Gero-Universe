import express, { Request, Response, Router } from "express";
import Permission, { IPermission } from "../models/permissionsModel";
import checkPermission from "../middlewares/checkPermissionMiddleware";
import { PERMISSIONS } from "../constants/permissions";
import createError from "http-errors";
import { ERRORS } from "../constants/errors";

// Declaration of the user routes
const permissionRoutes: Router = express.Router();

// Function to create a permission
permissionRoutes.post(
  "/createPermission",
  checkPermission([PERMISSIONS.PERMISSIONS.permissions_w, PERMISSIONS.PERMISSIONS.permissions_rw]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const introducedPermission: IPermission = req.body;
      const newPermission = new Permission(introducedPermission);
      await newPermission.save();
      res.status(201).json({ message: "Permission created successfully" });
    } catch (error: any) {
      handleError(error, res, "Error creating permission");
    }
  }
);

// Function to delete permission by name of the permission
permissionRoutes.delete(
  "/deletePermissionByName/:name",
  checkPermission([PERMISSIONS.PERMISSIONS.permission_d]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name }: Partial<IPermission> = req.params;
      const deletedPermission: Partial<IPermission> = (await Permission.findOneAndDelete({ name })) as IPermission;

      if (!deletedPermission) {
        throw createError(ERRORS.PERMISSIONS.NOT_FOUND.status, ERRORS.PERMISSIONS.NOT_FOUND.message, { code: ERRORS.PERMISSIONS.NOT_FOUND.code });
      }

      res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error: any) {
      handleError(error, res, "Error deleting permission");
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
function handleError(error: any, res: Response, defaultErrorMessage: String): void {
  const errorCodes: string[] = [ERRORS.PERMISSIONS.NOT_FOUND.code, ERRORS.MONGO.DUPLICATE_KEY.code_number];

  const errorCode: string = String(error.code);
  if (errorCodes.includes(errorCode)) {
    if (errorCode === ERRORS.MONGO.DUPLICATE_KEY.code_number) {
      res.status(ERRORS.MONGO.DUPLICATE_KEY.status).send({
        message: `${ERRORS.MONGO.DUPLICATE_KEY.message} ${JSON.stringify(error.keyValue)}`,
      });
    } else {
      res.status(error.status).send({ message: error.message });
    }
  } else {
    res.status(500).send({ message: defaultErrorMessage });
  }
}

export default permissionRoutes;
