import mongoose from "mongoose";
import { geroUniverseDBConnection } from "../config/geroUniverseDatabase";

// Declaration of the permissions interface
export interface IPermission {
  name: String;
  description?: String;
  createdAt?: Date;
  updatedAt?: Date;
}

// Declaration of the permissions schema
const PermissionSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Permission = geroUniverseDBConnection.model(
  "Permission",
  PermissionSchema
);

export default Permission;
