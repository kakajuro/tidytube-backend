import Image from "next/image";
import Link from "next/link";

import { BorderBeam } from "@/components/magicui/border-beam";
import { synopsisForMiniAbout } from "@/components/text";

import tidytubePromoGif from "@/app/images/tidytubepromo.gif";
import tidytubePromo from "@/app/images/tidytubepromo2.mp4";

export default function MiniAbout() {

  return (
    <section className="min-h-screen lg:px-48 flex flex-col items-center justify-center select-none">
      <h1 className="font-semibold text-4xl pb-12 lg:pb-20">what is tidytube?</h1>
      <div className="grid place-content-center grid-cols-1 lg:gap-12 text-white">
        <div className="flex flex-col px-10 pb-10 lg:pb-0 xl:pr-0 sm:max-w-[640px] lg:max-w-screen-2xl  justify-center items-center text-center">
          <span className="text-lg sm:text-xl lg:max-w-[80%] xl:max-w-[70%] xl:text-xl">{synopsisForMiniAbout}</span>
        </div>
        <div className="justify-self-center place-self-center">
          <div className="h-48 w-60 xs:h-64 xs:w-[24rem] sm:h-80 sm:w-[36rem] lg:h-96 lg:w-[40rem] xl:w-[44rem] relative border-beam rounded-lg drop-shadow-glow">
            <Image 
              src={tidytubePromoGif}
              alt="GIF showing how the browser extension works"
              layout="fill"
              objectFit="cover" 
              className="rounded-lg"
            />
            <BorderBeam />
          </div>
        </div>
      </div>
      <div className="pt-14 lg:pt-20">
        <button className="text-lg sm:text-xl underline hover:cursor-pointer hover:text-red-700 transition-all ease-in-out">
          <Link href="about">
            Find out more about how it works:
          </Link>
        </button>
      </div>
    </section>
  )
}
