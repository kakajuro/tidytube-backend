import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";
import redisClient from "../util/redisClient";

import generateUniqueID from "generate-unique-id";
import Crypto from "crypto-js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get('/', validInstall, async (req: Request, res: Response) => {

  const clientIDSecret = process.env.CLIENTIDSECRET!;

  let clientIDisNew = false;
  let clientID = "";

  while (!clientIDisNew) {

    clientID = generateUniqueID({ length: 64 });

    // Check if clientID already exists
    await redisClient.exists(clientID)
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

  let encryptedUserID = Crypto.AES.encrypt(clientID, clientIDSecret).toString();

  // Store userID in database and return encyrpted userID alongside userNo|timestamp
  // swap current usernumber to total install number
  let currentUserCount = await redisClient.dbsize();
  currentUserCount++;
  let timestamp = new Date().getTime();
  let dataString = `${currentUserCount}|${timestamp}`;

  // Add to current user count + total user count here

  await redisClient.set(clientID, dataString);
  console.log(`New user initialised with clientID: ${clientID}`);
  
	return res.status(200).send({clientID: encryptedUserID});
});

export default router;