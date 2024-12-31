import mongoose from "mongoose";
import { geroUniverseDBConnection } from "../config/geroUniverseDatabase";

// Declaration of the interface
export interface IUser {
  email: string;
  username: string;
  password: string;
  role?: "admin" | "user" | undefined;
  permissions?: string[];
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  lastLogin?: Date;
  status?: "ACTIVE" | "PENDING" | "ARCHIVED" | "DELETED";
  createdAt?: Date;
  updatedAt?: Date;
  _id: String;
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
      type: [String],
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
