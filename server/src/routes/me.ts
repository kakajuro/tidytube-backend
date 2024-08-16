import express, { Request, Response } from "express";

import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	if (!clientID) {
		console.warn("No clientID in request");
      	return res.status(401).send({"message": "Invalid credentials"});
	}

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	await redisClient.get(encryptedClientID)
	.then(dataString => {
		if (!dataString) {
			console.warn("clientID not found");
			return res.status(401).json({ message: "Invalid credentials" });
		}

		let installNo = dataString?.split("|")[0];
    	let timestamp = dataString?.split("|")[1];

		return res.status(200).json({installNo, timestamp});

	})
	.catch(error => {
		console.warn(`There was an error checking whether this key exists: ${encryptedClientID}`);
      	return res.status(500).send("An internal server error occurred");
	})

});

export default router;