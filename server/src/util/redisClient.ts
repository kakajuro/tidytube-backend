import Redis from "ioredis";

import dotenv from "dotenv";
dotenv.config();

let maxRetries = 10;

const client = new Redis({
  port: parseInt(process.env.REDIS_PORT!),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
  maxRetriesPerRequest: maxRetries,
  retryStrategy(times) {
    console.warn(`Retrying redis connection: attempt ${times}`);
    return Math.min(times * 500, 3000);
  },
});

export default client;