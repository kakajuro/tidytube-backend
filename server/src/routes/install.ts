import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";
import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';
import generateUniqueID from "generate-unique-id";

import dotenv from "dotenv";
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
  // swap current usernumber to total install number
  let currentUserCount = await redisClient.dbsize();
  currentUserCount++;
  let timestamp = new Date().getTime();
  let dataString = `${currentUserCount}|${timestamp}`;

  // Add to current user count + total user count here

  await redisClient.set(encryptedClientID, dataString);
  console.log(`New user initialised with encryptedClientID: ${encryptedClientID}`);
  
	return res.status(200).send({clientID: clientID});
});

export default router;