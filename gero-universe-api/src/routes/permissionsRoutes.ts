import express, { Request, Response, Router } from "express";
import Permission, { IPermission } from "../models/permissionsModel";

// Declaration of the user routes
const permissionRoutes: Router = express.Router();

// Function to create a permission
permissionRoutes.post(
  "/createPermission",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const introducedPermission: IPermission = req.body;
      const newPermission = new Permission(introducedPermission);
      await newPermission.save();
      res.status(201).json({ message: "Permission created successfully" });
    } catch (error: any) {
      res
        .status(400)
        .send({ message: `Error creating permission: ${error.message}` });
    }
  }
);

export default permissionRoutes;
