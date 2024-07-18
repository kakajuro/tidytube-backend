import Image from "next/image";
import Link from "next/link";

import { BorderBeam } from "@/components/magicui/border-beam";
import { synopsisForMiniAbout } from "@/components/text";

import tidytubeScreenshot from "@/app/images/tidytubescreenshot.png";

export default function MiniAbout() {

  return (
    <section className="min-h-screen lg:px-48 flex flex-col items-center justify-center select-none">
      <h1 className="font-semibold text-4xl pb-12 lg:pb-20">what is tidytube?</h1>
      <div className="grid place-content-center grid-cols-1 lg:grid-cols-2 text-white">
        <div className="flex flex-col pb-10 lg:pb-0 lg:pr-12 xl:pr-0 max-w-[350px] sm:max-w-[480px] justify-center text-center lg:text-left">
          <span className="text-lg sm:text-xl pb-8">{synopsisForMiniAbout}</span>
          <button className="text-lg sm:text-xl underline hover:cursor-pointer hover:text-red-700 transition-all ease-in-out">
            <Link href="about">
              Find out more about how it works:
            </Link>
          </button>
        </div>
        <div className="justify-self-center place-self-center">
          <div className="relative border-beam rounded-lg drop-shadow-glow">
            <Image 
              src={tidytubeScreenshot}
              alt="Screenshot of tidytube browser extension" 
              className="rounded-lg"
              placeholder="blur"
            />
            <BorderBeam />
          </div>
        </div>
      </div>
    </section>
  )
}
