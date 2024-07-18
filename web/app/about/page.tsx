import Image from "next/image";
import Link from "next/link";

import { dataNoticeAbout, howItWorksAbout } from "@/components/text"

import sectionsRemovedGif from "@/app/images/sectionsRemoved.gif";

export default function About() {

  const sf = 0.6;

  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[50%]">
        <h1 className="text-3xl font-semibold pb-6">how does it work?</h1>
        <p className="pb-4 text-xl">{howItWorksAbout}</p>
        <p className="pb-4 text-xl">{dataNoticeAbout} <a className="hover:underline hover:cursor-pointer">here.</a></p>
        <div className="flex self-center">
          <Image 
            src={sectionsRemovedGif} 
            alt="Gif showing extension popup"
            width={sectionsRemovedGif.width*sf}
            height={sectionsRemovedGif.height*sf} 
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] md:w-[50%] pt-12">
        <h1 className="text-3xl font-semibold pb-6">works best with:</h1>
        <ul className="text-xl">
          <li>
            <Link className="hover:cursor-pointer hover:underline" href="https://sponsor.ajay.app" passHref>
              -SponsorBlock
            </Link>
          </li>
          <li>
            <Link className="hover:cursor-pointer hover:underline" href="https://ublockorigin.com/" passHref>
              -uBlock Origin
            </Link>
          </li>
          <li>
            <Link className="hover:cursor-pointer hover:underline" href="https://www.youtube.com/premium" passHref>
              -Youtube Premium
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-[90%] md:w-[50%] pt-12 text-xl">
        <h1 className="text-3xl font-semibold pb-6">timeline</h1>
        <p>Project start date: Jan 27 2024 (yes its a long time ago but I had exams in the middle of developing this)</p>
        <p>Project release date: tbd</p>
      </div>
      <div className="flex flex-col w-[90%] md:w-[50%] pt-12 text-xl">
        <h1 className="text-3xl font-semibold pb-6">contact details</h1>
        <p>You contact me by email at </p>
        <p>Follow on twitter: </p>
        <p>Join the discord server: ?</p>
      </div>
      <div className="flex flex-col w-[90%] md:w-[50%] pt-12 text-xl">
        <Link href="credits" className="hover:cursor-pointer hover:underline font-bold">see credits here</Link>
      </div>
    </main>
  )
}
