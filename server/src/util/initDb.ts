import redisClient from "./redisClient";

export default async function initDB() {

	// Create stats key if it doesnt exist already
	await redisClient.exists("stats")
	.then(exists => {
		if (!exists) {
			redisClient.hset("stats", "removeShortsFromSearch", 0);
			redisClient.hset("stats", "removeShortsFromSite", 0);
			redisClient.hset("stats", "removeShortsPlayback", 0);
			redisClient.hset("stats", "removeShortsRemixingThisVideo", 0);
			redisClient.hset("stats", "removeShortsWhileWatching", 0);
			redisClient.hset("stats", "removeShortsExplore", 0);
			redisClient.hset("stats", "removeShortsFromChannel", 0);

			redisClient.hset("stats", "removeNewChannelsFromSearch", 0);
			redisClient.hset("stats", "removeLatestPostsFromSearch", 0);
			redisClient.hset("stats", "removeLatestVideosFromSearch", 0);
			redisClient.hset("stats", "removePreviouslyWatchedFromSearch", 0);
			redisClient.hset("stats", "removeForYouFromSearch", 0);
			redisClient.hset("stats", "removePeopleAlsoWatchedFromSearch", 0);
			redisClient.hset("stats", "removeFromRelatedSearches", 0);
			redisClient.hset("stats", "removePeopleAlsoSearchFor", 0);

			redisClient.hset("stats", "removeAdsFromReccomendations", 0);
			redisClient.hset("stats", "removeAdCompanionSlots", 0);
			redisClient.hset("stats", "removeFeaturedBanners", 0);
			redisClient.hset("stats", "removePopups", 0);
			redisClient.hset("stats", "removeNews", 0);
			redisClient.hset("stats", "removeForYouFromChannel", 0);

			redisClient.hset("stats", "sectionsRemovedTotal", 0);
			redisClient.hset("stats", "currentUsers", 0);
			redisClient.hset("stats", "totalInstalls", 0);
		}
	})

}