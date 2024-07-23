import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  console.log(`Recieved Request: ${req.ip}`)
  res.send("API working...");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("test route!");
});

app.listen(port, () => {
  console.log(`[server]: Server running on PORT: ${port}...`);
});