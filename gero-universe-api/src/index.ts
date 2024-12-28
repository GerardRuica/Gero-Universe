import express, { Request, Response } from "express";
import appRoutes from "./routes/appRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) ?? 3000;

// Middleware for managing JSON requests
app.use(express.json());

// To edit cookies
app.use(cookieParser());

// To accept CORS
app.use(cors());

// App routes
app.use("/", appRoutes);

// Middleware to check if an user has session or not
app.use((req: Request, res: Response, next) => {
  const token: string = req.cookies.access_token;
  //req.session = { user: null };

  try {
    const data: JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    //req.session.user = data;
  } catch (error: any) {}

  next();
});

// Port assignation
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get(["/", "/api"], (req: Request, res: Response) => {
  res.send("API works");
});
