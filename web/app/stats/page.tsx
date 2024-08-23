export const dynamic = "force-dynamic";

import { getStats } from "../actions"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats"
}


export default async function page() {

  const data = await getStats();
  // @ts-expect-error Typed as numbers in the StatsData interface but are treated as strings when added together
  let totalShortsSections = parseInt(data?.removeShortsExplore) + parseInt(data?.removeShortsFromChannel) + parseInt(data?.removeShortsFromSearch) + parseInt(data?.removeShortsPlayback) + parseInt(data?.removeShortsRemixingThisVideo) + parseInt(data?.removeShortsWhileWatching);
  // @ts-expect-error Typed as numbers in the StatsData interface but are treated as strings when added together
  let totalSearchSections = parseInt(data?.removeNewChannelsFromSearch) + parseInt(data?.removeLatestPostsFromSearch) + parseInt(data?.removeLatestVideosFromSearch) + parseInt(data?.removeLatestVideosFromSearch) + parseInt(data?.removePreviouslyWatchedFromSearch) + parseInt(data?.removeForYouFromSearch) + parseInt(data?.removePeopleAlsoWatchedFromSearch) + parseInt(data?.removeFromRelatedSearches) + parseInt(data?.removePeopleAlsoSearchFor);

  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">stats</h1>
        <div className="text-xl">
          <h2 className="text-2xl font-semibold pb-4 underline">Overall stats:</h2>
          <p>Total downloads: {data?.totalInstalls || "Data not found"}</p>
          <p>Current number of users: {data?.currentUsers || "Data not found"}</p>
          <p>Total sections removed: {data?.totalSectionsRemoved || "Data not found"}</p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">General:</h2>
          <p>Ads removed from reccomendations: {data?.removeAdsFromReccomendations || "Data not found"}</p>
          <p>Featured banners removed: {data?.removeFeaturedBanners || "Data not found"}</p>
          <p>Popups removed: {data?.removePopups || "Data not found"}</p>
          <p>Ad companions removed: {data?.removeAdCompanionSlots || "Data not found"}</p>
          <p><em>For You</em> sections removed from channel pages: {data?.removeForYouFromChannel || "Data not found"}</p>
          <p>News sections removed: {data?.removeNews || "Data not found"}</p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Shorts:</h2>
          <p>Shorts removed from search page: {data?.removeShortsFromSearch || "Data not found"}</p>
          <p>Shorts removed from channel pages: {data?.removeShortsFromChannel || "Data not found"}</p>
          <p>Shorts prevented from playing: {data?.removeShortsPlayback || "Data not found"}</p>
          <p>Shorts removed from the homepage: {data?.removeShortsExplore || "Data not found"}</p>
          <p>Shorts removed from watch next reccomendations: {data?.removeShortsWhileWatching || "Data not found"}</p>
          <p><em>Shorts Remixing This Video</em> sections removed: {data?.removeShortsRemixingThisVideo || "Data not found"}</p>
          <p>Total shorts removed: {totalShortsSections || "Data not found"}</p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Search:</h2>
          <p><em>Channels New To You</em> sections removed: {data?.removeNewChannelsFromSearch || "Data not found"}</p>
          <p><em>Latest Posts From ...</em> sections removed: {data?.removeLatestPostsFromSearch || "Data not found"}</p>
          <p><em>Latest Videos From </em> sections removed: {data?.removeLatestVideosFromSearch || "Data not found"}</p>
          <p><em>Previously Watched</em> sections removed: {data?.removePreviouslyWatchedFromSearch || "Data not found"}</p>
          <p><em>For You</em> sections removed: {data?.removeForYouFromSearch || "Data not found"}</p>
          <p><em>People Also Watched</em> sections removed: {data?.removePeopleAlsoWatchedFromSearch || "Data not found"}</p>
          <p><em>From Related Searches</em> sections removed: {data?.removeFromRelatedSearches || "Data not found"}</p>
          <p><em>People Also Search For</em> sections removed: {data?.removePeopleAlsoSearchFor || "Data not found"}</p>
          <p>Total search sections removed: {totalSearchSections || "Data not found"}</p>
        </div>
      </div>
    </main>
  )
}
