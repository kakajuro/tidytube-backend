import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import installRouter from "./routes/install";
import uninstallRouter from "./routes/uninstall";
import getInstallNoRouter from "./routes/getInstallNo";
import statsRouter from "./routes/stats";

import initDB from "./util/initDb";

import dotenv from "dotenv";
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

// Setup db
initDB();

// Routers
app.use("/api/install", installRouter);
app.use("/api/uninstall", uninstallRouter);
app.use("/api/getInstallNo", getInstallNoRouter);

app.use("/api/stats", statsRouter);

// Start server
app.listen(port, () => {
  console.log(`[server]: Server running on PORT: ${port}...`);
});