import express, { Request, Response } from "express";

import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	await redisClient.get(encryptedClientID)
	.then(dataString => {
		let installNo = dataString?.split("|")[0];

		return res.status(200).json({installNo: installNo});

	})
	.catch(error => {
		console.warn(`There was an error checking whether this key exists: ${encryptedClientID}`);
      	res.status(500).send("An internal server error occurred");
	})

});

export default router;