"use server";

export interface StatsData {
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
  "removeShortsWhileWatching": number,
  "removeRecommendedTopicsFromSearch": number,
  "autoDisableAutoplay": number

  "currentUsers": number,
  "totalInstalls": number,
  "totalSectionsRemoved": number
}

export async function getStats() {

  let apiURL;

  if (process.env.NODE_ENV === "development") {
    process.env.IS_DOCKERISED ? apiURL = "http://server:3000" : apiURL = "http://localhost:8000"
  } else {
    apiURL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
  }

  let res = await fetch(`${apiURL}/api/stats`, { next: { revalidate: 60 }})
  .then(res => {
    return res.json();
  })
  .then(jsonRes => {
    let returnData:StatsData = jsonRes;
    return returnData
  })
  .catch(err => {
    console.log(`An error occurred fetching the data: ${err}`);
    return null
  })

  // if (!res.ok) {
  //   return null
  // }

  // let jsonRes:StatsData = await res.json();
  return res;

}
