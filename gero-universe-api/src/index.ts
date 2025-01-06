import express, { Request, Response } from "express";
import appRoutes from "./routes/appRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import isAuthenticated from "./middlewares/authMiddleware";

// To enable .env files
dotenv.config();

// To create an express app
const app = express();

// App port
const PORT: number = Number(process.env.PORT) ?? 3000;

// Middleware for managing JSON requests
app.use(express.json());

// To edit cookies
app.use(cookieParser());

// To accept CORS and enable credentials with backend and frontend
app.use(
  cors({
    origin: process.env.FRONT_END_HOST,
    credentials: true,
  })
);

// Middleware to check if an user has session or not
app.use(isAuthenticated);

// App routes
app.use("/", appRoutes);

// Port assignation
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// To test if api works
app.get(["/", "/api"], (req: Request, res: Response) => {
  res.send("API works");
});
