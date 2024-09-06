import express, { Request, Response } from "express";
import validInstall from "../middleware/validInstall";

import redisClient from "../util/redisClient";

import { sha256 } from "js-sha256";

import { defaultStats, PageChangeData } from "../util/initDb";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", validInstall, async (req: Request, res: Response) => {

	const incomingStats:PageChangeData = { ...defaultStats, ...req.body };

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	try {
    const exists = await redisClient.exists(encryptedClientID);
    if (!exists && !res.headersSent) {
      return res.json(401).json({"message": "Invalid credentials"});
    }

		for (const [key, value] of Object.entries(incomingStats)) {
      if (!Number.isInteger(value)) {
          console.warn(`WARNING updating stats: Value for ${key} is not an integer: ${value}. Skipping this value...`);
      } else {
        await redisClient.hincrby("stats", key, value);
      }
    }

		let sumOfSectionsRemoved:number = 0;
		Object.values(incomingStats).forEach(val => sumOfSectionsRemoved += val);

		await redisClient.hincrby("stats", "totalSectionsRemoved", sumOfSectionsRemoved);

    return !res.headersSent ? res.status(200).json({"message": "Stats updated sucessfully"}) : null;

	} catch (error) {
		console.warn(`Error updating stats: ${error}`);
    if (!res.headersSent) {
      return res.status(500).json("An internal server error occurred");
    }
	}

});

export default router;