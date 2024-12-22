import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript API!");
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from API in TypeScript!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});