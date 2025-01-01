import express, { Request, Response, Router } from "express";
import Permission, { IPermission } from "../models/permissionsModel";
import checkPermission from "../middlewares/checkPermissionMiddleware";
import { PERMISSIONS } from "../constants/permissions";

// Declaration of the user routes
const permissionRoutes: Router = express.Router();

// Function to create a permission
permissionRoutes.post(
  "/createPermission",
  checkPermission([
    PERMISSIONS.PERMISSIONS.permissions_w,
    PERMISSIONS.PERMISSIONS.permissions_rw,
  ]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const introducedPermission: IPermission = req.body;
      const newPermission = new Permission(introducedPermission);
      await newPermission.save();
      res.status(201).json({ message: "Permission created successfully" });
    } catch (error: any) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(400).send({
          message: `Error: duplicate key on: ${JSON.stringify(error.keyValue)}`,
        });
      } else {
        res.status(500).send({ message: `Error creating permission` });
      }
    }
  }
);

export default permissionRoutes;
