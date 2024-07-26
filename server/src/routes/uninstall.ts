import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";
import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", validInstall, async (req: Request, res: Response) => {

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	// Check if clientID exists and remove it if it does
	await redisClient.exists(encryptedClientID)
	.then(exists => {

		if (exists) {
			redisClient.del(encryptedClientID)
			.catch(error => {
				console.warn(`Error deleting clientID from database: ${error}`);
				return res.status(500).send("An internal server error occurred");
			})
		} else {
			console.warn(`clientID recieved does not exist`);
			return res.status(500).send("An internal server error occurred");
		}

	})
	.then(() => res.status(200).json("Successful"))
	.catch(error => {
      console.warn(`There was an error checking whether this key exists: ${clientID}`);
      res.status(500).send("An internal server error occurred");
    });

    // Remove from current user count here

});

export default router;