"use server";

import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig();

interface StatsData {
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
  "removeShortsFromSite": number,
  "removeShortsPlayback": number,
  "removeShortsRemixingThisVideo": number,
  "removeShortsWhileWatching": number,

  "currentUsers": number,
  "totalInstalls": number,
  "totalSectionsRemoved": number
}

export async function getStats() {

  let apiURL;

  if (process.env.NODE_ENV === "development") {
    process.env.IS_DOCKERISED ? apiURL = "http://server:3000" : apiURL = "http://localhost:8000"
  } else {
    apiURL = serverRuntimeConfig.API_URL;
  }
  
  let res = await fetch(`${apiURL}/api/stats`, { next: { revalidate: 60 }});
  let jsonRes:StatsData = await res.json();

  return jsonRes

}