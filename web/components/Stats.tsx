export const dynamic = "force-dynamic";

import Link from "next/link";

import NumberTicker from "./magicui/number-ticker";

import { getStats } from "@/app/actions";

export default async function Stats() {

  const { totalSectionsRemoved, currentUsers, totalInstalls } = await getStats();

  return (
    <section className="flex flex-col w-screen min-h-screen justify-center text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">does anyone actually use this thing?</h2>
          <p className="mt-4 sm:text-xl">
            tidytube is already being used by many to improve their experience on Youtube. Here is a quick summary of the overall stats. See the full breakdown on the stats page.
          </p>
        </div>
        <div className="mt-4 mb-12 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium">Sections Removed</dt>
              <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">
                <NumberTicker value={totalSectionsRemoved} compact />
              </dd>
            </div>
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium">Current Users</dt>
              <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">
                <NumberTicker value={currentUsers} compact />
              </dd>
            </div>
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium">Total installs</dt>
              <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">
                <NumberTicker value={totalInstalls} compact />
              </dd>
            </div>
          </dl>
        </div>
        <button 
          className="hover:underline hover:text-red-700 transition-all ease-in-out"
        >
          <Link href="stats">
            See all stats
          </Link>
        </button>
      </div>
    </section>
  )
}