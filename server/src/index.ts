import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app:Express = express();

app.use(helmet());
if (env == "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req: Request, res: Response, next: NextFunction) => {
  return res.send({"result": "API working..."});
});

app.listen(port, () => {
  console.log(`[server]: Server running on PORT: ${port}...`);
});