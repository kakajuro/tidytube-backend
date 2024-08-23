import Link from "next/link";
import { Metadata } from "next";

import { donationMessage, donationMessageTwo } from "@/components/text";

export const metadata: Metadata = {
  title: "Donate"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">donate</h1>
        <p className="font-medium text-xl pb-4">{donationMessage}</p>
        <p className="font-medium text-xl pb-4">{donationMessageTwo}</p>
        <div className="flex flex-col pt-6 text-xl">
          <h2 className="font-semibold text-3xl pb-6">links:</h2>
          <ul>
            <li>
              <Link className="hover:cursor-pointer hover:underline" href="https://github.com/sponsors/kakajuro" passHref target="_blank">
              -Github
              </Link>
            </li>
            <li>
              <Link className="hover:cursor-pointer hover:underline" href="https://ko-fi.com/kakajuro" passHref target="_blank">
              -Kofi
              </Link>
            </li>
            <li>
              <Link className="hover:cursor-pointer hover:underline" href="https://www.buymeacoffee.com/kakajuro" passHref target="_blank">
              -buymeacoffee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
