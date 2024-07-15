import Image from "next/image"

import { BorderBeam } from "@/components/magicui/border-beam";

import tidytubeScreenshot from "../app/tidytubescreenshot.jpg"

import { synopsisForMiniAbout } from "@/components/text"

export default function MiniAbout() {

  return (
    <section className="min-h-screen px-48 flex flex-col items-center justify-center">
      <h1 className="font-semibold text-4xl pb-24">what is tidytube?</h1>
      <div className="grid place-content-center grid-cols-2 text-white">
        <div className="flex flex-col max-w-[480px] justify-center">
          <span className="text-xl pb-8">{synopsisForMiniAbout}</span>
          <span className="text-xl underline hover:cursor-pointer hover:text-red-700 transition-all ease-in-out max-w-[290px] h-7">Find out more about how it works:</span>
        </div>
        <div className="justify-self-center place-self-center">
          <div className="relative border-beam rounded-lg">
            <Image 
              src={tidytubeScreenshot}
              alt="Screenshot of tidytube browser extension" 
              placeholder="blur"
            />
            <BorderBeam />
          </div>
        </div>
      </div>
    </section>
  )
}
