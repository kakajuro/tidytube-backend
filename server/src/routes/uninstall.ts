import express, { Request, Response } from "express";

import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {

	const clientIDSecret = process.env.CLIENTIDSECRET!;
	const uninstallKeySecret = process.env.UNINSTALLKEYSECRET!;

	const clientID = req.headers["client-id"]! as string;
	const uninstallKey = req.headers["uninstall-key"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);
	const encryptedUninstallKey = sha256.hmac(uninstallKeySecret, uninstallKey);

	await redisClient.exists(encryptedClientID)
	.then((exists) => {

		let uninstallKeyValid;

		if (exists) {
			// Check if uninstall key is valid
			redisClient.get(encryptedClientID)
			.then(dataString => {
				let storedUninstallKey = dataString?.split("|")[2];
				uninstallKeyValid = (storedUninstallKey === encryptedUninstallKey);
			})
			.catch(error => {
		    console.warn(`There was an error retrieving this client key: ${clientID}`);
		    res.status(500).send({"message": "An internal server error occurred"});
		  })
		}

		return uninstallKeyValid
	})
	.then((uninstallKeyValid) => {

		if (uninstallKeyValid) {
			// If these checks pass delete the user from the database
			redisClient.del(encryptedClientID)
			.then(() => {
				redisClient.hincrby("stats", "currentUsers", -1)
				.catch(error => {
					console.warn(`Error updating stats: ${error}`);
					return res.status(500).send({"message": "An internal server error occurred"});
				})
			})
			.catch(error => {
				console.warn(`Error deleting clientID from database: ${error}`);
				return res.status(500).send({"message": "An internal server error occurred"});
			});
			
		} else {
			console.log("Invalid uninstall key received")
			return res.status(401).json({"message": "Invalid credentials"});
		}

	})
	.then(() => {
		res.status(200).json({"message": "Uninstalled successfully"});
	})
	.catch(error => {
		console.warn(`clientID recieved does not exist: ${error}`);
		return res.status(401).json({"message": "Invalid credentials"});
	})

});

export default router;