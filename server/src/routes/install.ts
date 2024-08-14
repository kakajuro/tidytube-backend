import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";
import redisClient from "../util/redisClient";

import { sha256 } from 'js-sha256';
import generateUniqueID from "generate-unique-id";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

  const clientIDSecret = process.env.CLIENTIDSECRET!;
  const uninstallKeySecret = process.env.UNINSTALLKEYSECRET!;

  let clientIDisNew = false;
  let clientID = "";
  let encryptedClientID = "";

  while (!clientIDisNew) {

    clientID = generateUniqueID({ length: 64, excludeSymbols: ["|"] });
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

  // Generate uninstallKey
  let uninstallKey = generateUniqueID({ length: 32, excludeSymbols: ["|"] });
  let encryptedUninstallKey = sha256.hmac(uninstallKeySecret, uninstallKey);

  // Store userID in database and return encyrpted userID alongside userNo|timestamp|uninstallKey
  // Update currentUserCount and total install stats
  await redisClient.hincrby("stats", "currentUsers", 1);
  await redisClient.hincrby("stats", "totalInstalls", 1);
  //await setTimeout(() => {}, 100);
  let installNo = await redisClient.hget("stats", "totalInstalls");

  let timestamp = new Date().getTime();
  let dataString = `${installNo}|${timestamp}|${encryptedUninstallKey}`;

  await redisClient.set(encryptedClientID, dataString);
  console.log(`${timestamp} New user created with eClientID: ${encryptedClientID}`);
  
	return res.status(200).send({clientID: clientID, uninstallKey: uninstallKey});
});

export default router;