import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import installRouter from "./routes/install";
import uninstallRouter from "./routes/uninstall";
import meRouter from "./routes/me";
import statsRouter from "./routes/stats";
import updateStatsRouter from "./routes/updateStats";

import initDB from "./util/initDb";
import redisClient from "./util/redisClient";

import dotenv from "dotenv";
import { rateLimiter } from "./util/rateLimiter";
dotenv.config();

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
app.use(rateLimiter);
app.set("trust proxy", 1);

// Setup db
initDB();

// Routers
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({"status": "OK"});
});

app.use("/api/install", installRouter);
app.use("/api/uninstall", uninstallRouter);
app.use("/api/me", meRouter);

app.use("/api/stats", statsRouter);
app.use("/api/updateStats", updateStatsRouter);

// Start server
app.listen(port, () => {
  console.log(`[server]: Server running on PORT: ${port}...`);
});

// Listen to redis errors
redisClient.on("error", async (err) => {
  if (err.name === "ECONNREFUSED") {
    console.warn(`Could not connect to Redis: ${err.message}.`);
    
    try {
      await redisClient.connect();
    } catch (error) {
      console.warn(`Redis could not recconect: ${error}`);
    }

  } else if (err.name === "MaxRetriesPerRequestError") {
    console.warn(`Critical Redis error: ${err.message}. Shutting down.`);
  } else {
    console.warn(`Redis encountered an error: ${err.message}.`);
  }
});

redisClient.on("connect", async () => {
  console.log("Redis connected successfully");
});