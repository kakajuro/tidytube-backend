import express, { Request, Response } from "express";

import redisClient from "../util/redisClient";

import Crypto from "crypto-js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const encryptedClientID = req.headers["client-id"]! as string;

	let clientID = Crypto.AES.decrypt(encryptedClientID, clientIDSecret).toString(Crypto.enc.Utf8);

	await redisClient.get(clientID)
	.then(dataString => {
		let installNo = dataString?.split("|")[0];

		return res.status(200).json({installNo: installNo});

	})
	.catch(error => {
		console.warn(`There was an error checking whether this key exists: ${clientID}`);
      	res.status(500).send("An internal server error occurred");
	})

});

export default router;