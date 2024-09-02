import express, { Request, Response } from "express";

import validInstall from "../middleware/validInstall";

import redisClient from "../util/redisClient";

import { sha256 } from "js-sha256";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

interface PageChangeData {
    "removeAdCompanionSlots": number,
    "removeAdsFromReccomendations": number,
    "removeFeaturedBanners": number,
    "removeForYouFromChannel": number,
    "removeForYouFromSearch": number,
    "removeFromRelatedSearches": number,
    "removeLatestPostsFromSearch": number,
    "removeLatestVideosFromSearch": number,
    "removeNewChannelsFromSearch": number,
    "removeNews": number,
    "removePeopleAlsoSearchFor": number,
    "removePeopleAlsoWatchedFromSearch": number,
    "removePopups": number,
    "removePreviouslyWatchedFromSearch": number,
    "removeShortsExplore": number,
    "removeShortsFromChannel": number,
    "removeShortsFromSearch": number,
    "removeShortsPlayback": number,
    "removeShortsRemixingThisVideo": number,
    "removeShortsWhileWatching": number
}

router.post("/", validInstall, async (req: Request, res: Response) => {

  const defaultStats: PageChangeData = {
    removeAdCompanionSlots: 0,
    removeAdsFromReccomendations: 0,
    removeFeaturedBanners: 0,
    removeForYouFromChannel: 0,
    removeForYouFromSearch: 0,
    removeFromRelatedSearches: 0,
    removeLatestPostsFromSearch: 0,
    removeLatestVideosFromSearch: 0,
    removeNewChannelsFromSearch: 0,
    removeNews: 0,
    removePeopleAlsoSearchFor: 0,
    removePeopleAlsoWatchedFromSearch: 0,
    removePopups: 0,
    removePreviouslyWatchedFromSearch: 0,
    removeShortsExplore: 0,
    removeShortsFromChannel: 0,
    removeShortsFromSearch: 0,
    removeShortsPlayback: 0,
    removeShortsRemixingThisVideo: 0,
    removeShortsWhileWatching: 0
  };

	const incomingStats:PageChangeData = { ...defaultStats, ...req.body };

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	try {
    const exists = await redisClient.exists(encryptedClientID);
    if (!exists && !res.headersSent) {
      return res.json(401).json({"message": "Invalid credentials"});
    }

		for (const [key, value] of Object.entries(incomingStats)) {
      if (!Number.isInteger(value)) {
          throw new Error(`Value for ${key} is not an integer: ${value}`);
      }
      await redisClient.hincrby("stats", key, value);
    }

		let sumOfSectionsRemoved:number = 0;
		Object.values(incomingStats).forEach(val => sumOfSectionsRemoved += val);

		await redisClient.hincrby("stats", "totalSectionsRemoved", sumOfSectionsRemoved);

    return !res.headersSent ? res.status(200).json({"message": "Stats updated sucessfully"}) : null;

	} catch (error) {
		console.warn(`Error updating stats: ${error}`);
    if (!res.headersSent) {
      return res.status(500).json("An internal server error occurred");
    }
	}

});

export default router;