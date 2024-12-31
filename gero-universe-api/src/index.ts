import express, { NextFunction, Request, Response } from "express";
import appRoutes from "./routes/appRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import isAuthenticated from "./middlewares/authMiddleware";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) ?? 3000;

// Middleware for managing JSON requests
app.use(express.json());

// To edit cookies
app.use(cookieParser());

// To accept CORS
app.use(cors());

// Middleware to check if an user has session or not
app.use(isAuthenticated);

// App routes
app.use("/", appRoutes);

// Port assignation
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get(["/", "/api"], (req: Request, res: Response) => {
  res.send("API works");
});
