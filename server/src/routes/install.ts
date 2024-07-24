import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";

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

    // Call DB and check ID is not being used already
    clientIDisNew = true;

  }

  let encryptedUserID = Crypto.AES.encrypt(clientID, clientIDSecret).toString();

  // Store userID in database and return encyrpted userID
  console.log(clientID);
  
	return res.status(200).send({"clientID": encryptedUserID});
});

export default router;