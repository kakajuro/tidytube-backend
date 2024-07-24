import Redis from "ioredis";

import dotenv from "dotenv";
dotenv.config();

const client = new Redis({
  port: parseInt(process.env.REDIS_PORT!),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

export default client;