import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";
import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';
import generateUniqueID from "generate-unique-id";

import dotenv from "dotenv";
import { timeStamp } from "console";
dotenv.config();

const router = express.Router();

router.get('/', validInstall, async (req: Request, res: Response) => {

  const clientIDSecret = process.env.CLIENTIDSECRET!;

  let clientIDisNew = false;
  let clientID = "";
  let encryptedClientID = "";

  while (!clientIDisNew) {

    clientID = generateUniqueID({ length: 64 });
    encryptedClientID = sha256.hmac(clientIDSecret, clientID);

    // Check if clientID already exists
    await redisClient.exists(encryptedClientID)
    .then((exists) => {

      if (exists) {
        clientIDisNew = false;
      } else {
        clientIDisNew = true;
      }

    })
    .catch(error => {
      console.warn(`There was an error checking whether this key exists: ${clientID}`);
      res.status(500).send("An internal server error occurred");
    })
  
  }

  // Store userID in database and return encyrpted userID alongside userNo|timestamp
  // Update currentUserCount and total install stats
  await redisClient.hincrby("stats", "currentUsers", 1);
  await redisClient.hincrby("stats", "totalInstalls", 1);
  let installNo = await redisClient.hget("stats", "totalIntstalls");

  let timestamp = new Date().getTime();
  let dataString = `${installNo}|${timestamp}`;

  await redisClient.set(encryptedClientID, dataString);
  console.log(`${timeStamp} New user created with eClientID: ${encryptedClientID}`);
  
	return res.status(200).send({clientID: clientID});
});

export default router;