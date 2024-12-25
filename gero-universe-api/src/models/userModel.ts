import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
}

// Declaration of user schema
const UserSchema = new mongoose.Schema({
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
    default: "active",
  },
});

// Middleware to hash password before save password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Function to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
