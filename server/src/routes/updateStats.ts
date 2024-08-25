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

	const incomingStats:PageChangeData = req.body;

	const clientIDSecret = process.env.CLIENTIDSECRET!;

	const clientID = req.headers["client-id"]! as string;

	const encryptedClientID = sha256.hmac(clientIDSecret, clientID);

	try {
    const exists = await redisClient.exists(encryptedClientID);
    if (!exists) {
      return res.json(401).json({"message": "Invalid credentials"});
    }

		redisClient.hincrby("stats", "removeAdCompanionSlots", incomingStats.removeAdCompanionSlots);
		redisClient.hincrby("stats", "removeAdsFromReccomendations", incomingStats.removeAdsFromReccomendations);
		redisClient.hincrby("stats", "removeFeaturedBanners", incomingStats.removeFeaturedBanners);
		redisClient.hincrby("stats", "removeForYouFromChannel", incomingStats.removeForYouFromChannel);
		redisClient.hincrby("stats", "removeForYouFromSearch", incomingStats.removeForYouFromSearch);
		redisClient.hincrby("stats", "removeFromRelatedSearches", incomingStats.removeFromRelatedSearches);
		redisClient.hincrby("stats", "removeLatestPostsFromSearch", incomingStats.removeLatestPostsFromSearch);
		redisClient.hincrby("stats", "removeLatestVideosFromSearch", incomingStats.removeLatestVideosFromSearch);
		redisClient.hincrby("stats", "removeNewChannelsFromSearch", incomingStats.removeNewChannelsFromSearch);
		redisClient.hincrby("stats", "removeNews", incomingStats.removeNews);
		redisClient.hincrby("stats", "removePeopleAlsoSearchFor", incomingStats.removePeopleAlsoSearchFor);
		redisClient.hincrby("stats", "removePeopleAlsoWatchedFromSearch", incomingStats.removePeopleAlsoWatchedFromSearch);
		redisClient.hincrby("stats", "removePopups", incomingStats.removePopups);
		redisClient.hincrby("stats", "removePreviouslyWatchedFromSearch", incomingStats.removePreviouslyWatchedFromSearch);
		redisClient.hincrby("stats", "removeShortsExplore", incomingStats.removeShortsExplore);
		redisClient.hincrby("stats", "removeShortsFromChannel", incomingStats.removeShortsFromChannel);
		redisClient.hincrby("stats", "removeShortsFromSearch", incomingStats.removeShortsFromSearch);
		redisClient.hincrby("stats", "removeShortsPlayback", incomingStats.removeShortsPlayback);
		redisClient.hincrby("stats", "removeShortsRemixingThisVideo", incomingStats.removeShortsRemixingThisVideo);
		redisClient.hincrby("stats", "removeShortsWhileWatching", incomingStats.removeShortsWhileWatching);

		let sumOfSectionsRemoved:number = 0;
		Object.values(incomingStats).forEach(val => sumOfSectionsRemoved += val);

		redisClient.hincrby("stats", "totalSectionsRemoved", sumOfSectionsRemoved);

    return res.status(200).json({"message": "Stats updated sucessfully"});

	} catch (error) {
		console.warn(`Error updating stats: ${error}`);
		return res.status(500).json("An internal server error occurred");
	}

});

export default router;