import mongoose, { Types } from "mongoose";
import { geroUniverseDBConnection } from "../config/geroUniverseDatabase";
import { IPermission } from "./permissionsModel";

// Declaration of the interface
export interface IUser {
  _id: Types.ObjectId[];
  email: string;
  username: string;
  password: string;
  role?: "admin" | "user" | undefined;
  permissions?: Types.ObjectId[] | IPermission[];
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  lastLogin?: Date;
  status?: "ACTIVE" | "PENDING" | "ARCHIVED" | "DELETED";
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
}

// Declaration of the user session
export interface IUserSession {
  userId: string;
  username: string;
  token: string;
}

// Declaration of user schema
const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    permissions: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Permission",
        },
      ],
      default: [],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PENDING", "ARCHIVED", "DELETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const User = geroUniverseDBConnection.model("User", UserSchema);

export default User;
