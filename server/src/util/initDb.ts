import redisClient from "./redisClient";

export interface PageChangeData {
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
  "removeRecommendedTopicsFromSearch": number,
  "autoDisableAutoplay": number
}

export const defaultStats: PageChangeData = {
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
  removeShortsWhileWatching: 0,
  removeRecommendedTopicsFromSearch: 0,
  autoDisableAutoplay: 0
};

export async function initDB() {

  console.log("Initialising datase...")

  // Create stats object if it doesnt exist already
  let exists = await redisClient.exists("stats");

  if (!exists) {

    // If stats object does not exist create it
    console.log("Creating stats data model...")
    for (const [key, value] of Object.entries(defaultStats)) {
      redisClient.hset("stats", key, value);
    }

  } else {

    // Even if it does exists, create the missing keys if there are any
    for (const [key, value] of Object.entries(defaultStats)) {
      redisClient.hexists("stats", key, (err, exists) => {
        if (err) {
          console.log("Error checking if key exists...")
        } else {

          if (!exists) { 
            redisClient.hset("stats", key, value); 
            console.log(`Added ${key} to stats data model`);
          }

        }

      });
    
    }

  }

  console.log("Database initialised")

}