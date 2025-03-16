import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// To enable .env files
import * as dotenv from "dotenv";
dotenv.config();

// Imports of the app
import appRoutes from "./routes/appRoutes";
import isAuthenticated from "./middlewares/authMiddleware";

// To create an express app
const app = express();

// App port and front end host
const PORT: number = Number(process.env.PORT) ?? 3000;
const FRONT_END_HOST: string =
  process.env.FRONT_END_HOST ?? "http://localhost:4200";

// Middleware for managing JSON requests
app.use(express.json());

// To edit cookies
app.use(cookieParser());

// To accept CORS and enable credentials with backend and frontend
app.use(
  cors({
    origin: [
      FRONT_END_HOST,
      "http://127.0.0.1:8080",
      "http://172.19.160.1:8080",
      "http://192.168.1.38:8080",
    ],
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
