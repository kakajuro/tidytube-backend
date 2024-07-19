
// Fetch data from server here

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">stats</h1>
        <div className="text-xl">
          <h2 className="text-2xl font-semibold pb-4 underline">Overall stats:</h2>
          <p>Total downloads: </p>
          <p>Current number of users: </p>
          <p>Total sections removed: </p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">General:</h2>
          <p>Ads removed from reccomendations: </p>
          <p>Featured banners removed: </p>
          <p>Popups removed: </p>
          <p>Add companions removed:</p>
          <p><em>For You</em> sections removed from channel pages: </p>
          <p>News sections removed: </p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Shorts:</h2>
          <p>Shorts prevented from playing: </p>
          <p>Featured banners removed: </p>
          <p>Popups removed: </p>
          <p>Add companions removed:</p>
          <p><em>For You</em> sections removed from channel pages: </p>
          <p>News sections removed: </p>
        </div>
        <div className="text-xl pt-12">
          <h2 className="text-2xl font-semibold pb-4 underline">Search:</h2>
          <p><em>Channels New To You</em> sections removed: </p>
          <p><em>Latest Posts From ...</em> sections removed: </p>
          <p><em>Latest Videos From </em> sections removed: </p>
          <p><em>Previously Watched</em> sections removed: </p>
          <p><em>For You</em> sections removed: </p>
          <p><em>People Also Watched</em> sections removed: </p>
          <p><em>From Related Searches</em> sections removed:</p>
          <p><em>People Also Search For</em> sections removed:</p>
        </div>
      </div>
    </main>
  )
}
