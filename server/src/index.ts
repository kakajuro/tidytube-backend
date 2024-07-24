import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

import installRouter from "./routes/install";

import client from "./util/redisClient";

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app:Express = express();

// Middleware
app.use(helmet());
if (env == "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/install", installRouter);

app.use("/ping", async (req: Request, res: Response) => {
  let redis = await client.ping();
  res.json(redis);
})

app.listen(port, () => {
  console.log(`[server]: Server running on PORT: ${port}...`);
});