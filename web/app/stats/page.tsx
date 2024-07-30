export const dynamic = "force-dynamic";

import { getStats } from "../actions"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats - tidytube"
}


export default async function page() {

  const data = await getStats();

  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">stats</h1>
        <div className="text-xl">
          <h2 className="text-2xl font-semibold pb-4 underline">Overall stats:</h2>
          <p>Total downloads: {data?.totalInstalls}</p>
          <p>Current number of users: {data?.currentUsers}</p>
          <p>Total sections removed: {data?.sectionsRemovedTotal}</p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">General:</h2>
          <p>Ads removed from reccomendations: {data?.removeAdsFromReccomendations}</p>
          <p>Featured banners removed: {data?.removeFeaturedBanners}</p>
          <p>Popups removed: {data?.removePopups}</p>
          <p>Add companions removed: {data?.removeAdCompanionSlots}</p>
          <p><em>For You</em> sections removed from channel pages: {data?.removeForYouFromChannel}</p>
          <p>News sections removed: </p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Shorts:</h2>
          <p>Shorts removed from search page: {data?.removeShortsFromSearch}</p>
          <p>Shorts removed from channel pages: {data?.removeShortsFromChannel}</p>
          <p>Shorts prevented from playing: {data?.removeShortsPlayback}</p>
          <p>Shorts removed from the site: {data?.removeShortsFromSite}</p>
          <p>Shorts removed from watch next reccomendations: {data?.removeShortsWhileWatching}</p>
          <p><em>Shorts Remixing This Video</em> sections removed: {data?.removeShortsRemixingThisVideo}</p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Search:</h2>
          <p><em>Channels New To You</em> sections removed: {data?.removeNewChannelsFromSearch}</p>
          <p><em>Latest Posts From ...</em> sections removed: {data?.removeLatestPostsFromSearch}</p>
          <p><em>Latest Videos From </em> sections removed: {data?.removeLatestVideosFromSearch}</p>
          <p><em>Previously Watched</em> sections removed: {data?.removePreviouslyWatchedFromSearch}</p>
          <p><em>For You</em> sections removed: {data?.removeForYouFromSearch}</p>
          <p><em>People Also Watched</em> sections removed: {data?.removePeopleAlsoWatchedFromSearch}</p>
          <p><em>From Related Searches</em> sections removed: {data?.removeFromRelatedSearches}</p>
          <p><em>People Also Search For</em> sections removed: {data?.removePeopleAlsoSearchFor}</p>
        </div>
      </div>
    </main>
  )
}
