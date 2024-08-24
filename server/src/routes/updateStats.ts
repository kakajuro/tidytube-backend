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

	const exists = await redisClient.exists(encryptedClientID);
  if (!exists) {
    return res.json(401).json({"message": "Invalid credentials"});
  }

	try {
		await redisClient.hincrby("stats", "removeAdCompanionSlots", incomingStats.removeAdCompanionSlots);
		await redisClient.hincrby("stats", "removeAdsFromReccomendations", incomingStats.removeAdsFromReccomendations);
		await redisClient.hincrby("stats", "removeFeaturedBanners", incomingStats.removeFeaturedBanners);
		await redisClient.hincrby("stats", "removeForYouFromChannel", incomingStats.removeForYouFromChannel);
		await redisClient.hincrby("stats", "removeForYouFromSearch", incomingStats.removeForYouFromSearch);
		await redisClient.hincrby("stats", "removeFromRelatedSearches", incomingStats.removeFromRelatedSearches);
		await redisClient.hincrby("stats", "removeLatestPostsFromSearch", incomingStats.removeLatestPostsFromSearch);
		await redisClient.hincrby("stats", "removeLatestVideosFromSearch", incomingStats.removeLatestVideosFromSearch);
		await redisClient.hincrby("stats", "removeNewChannelsFromSearch", incomingStats.removeNewChannelsFromSearch);
		await redisClient.hincrby("stats", "removeNews", incomingStats.removeNews);
		await redisClient.hincrby("stats", "removePeopleAlsoSearchFor", incomingStats.removePeopleAlsoSearchFor);
		await redisClient.hincrby("stats", "removePeopleAlsoWatchedFromSearch", incomingStats.removePeopleAlsoWatchedFromSearch);
		await redisClient.hincrby("stats", "removePopups", incomingStats.removePopups);
		await redisClient.hincrby("stats", "removePreviouslyWatchedFromSearch", incomingStats.removePreviouslyWatchedFromSearch);
		await redisClient.hincrby("stats", "removeShortsExplore", incomingStats.removeShortsExplore);
		await redisClient.hincrby("stats", "removeShortsFromChannel", incomingStats.removeShortsFromChannel);
		await redisClient.hincrby("stats", "removeShortsFromSearch", incomingStats.removeShortsFromSearch);
		await redisClient.hincrby("stats", "removeShortsPlayback", incomingStats.removeShortsPlayback);
		await redisClient.hincrby("stats", "removeShortsRemixingThisVideo", incomingStats.removeShortsRemixingThisVideo);
		await redisClient.hincrby("stats", "removeShortsWhileWatching", incomingStats.removeShortsWhileWatching);

		let sumOfSectionsRemoved:number = 0;
		Object.values(incomingStats).forEach(val => sumOfSectionsRemoved += val);

		await redisClient.hincrby("stats", "totalSectionsRemoved", sumOfSectionsRemoved)
    return res.status(200).json({"message": "Stats updated sucessfully"});

	} catch (error) {
		console.warn(`Error updating stats: ${error}`);
		return res.status(500).json("An internal server error occurred");
	}

});

export default router;