import express, { Request, Response } from "express";
import appRoutes from "./routes/appRoutes";
import userRoutes from "./routes/userRoutes";

const cors = require("cors");
const app = express();
const port: number = 3000;

// Middleware for managing JSON requests
app.use(express.json());
// To accept CORS
app.use(cors());
// App routes
app.use("/", appRoutes);
// Port assignation
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get(["/", "/api"], (req: Request, res: Response) => {
  res.send("API works");
});
