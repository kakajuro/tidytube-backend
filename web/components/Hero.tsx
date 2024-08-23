"use client";

import Link from "next/link";

import BlurFade from "@/components/magicui/blur-fade";
import Particles from "./magicui/particles";

import { BsBrowserChrome } from "react-icons/bs";
import { BsBrowserEdge } from "react-icons/bs";
import { BsBrowserFirefox } from "react-icons/bs";

export default function Hero() {

  const chromeDownloadLink = "https://chromewebstore.google.com/detail/tidytube-declutter-youtub/apibkmhaeddgpadajegdpcdlifodaonb";
  const firefoxDownloadLink = "https://addons.mozilla.org/en-GB/firefox/addon/tidytube-declutter-youtube";
  const edgeDownloadLink = "https://microsoftedge.microsoft.com/addons/detail/ofonionbpflcmjgnofibdegeaiibdflp";

  const baseDelayIcons = 1.2;

  return (
    <section className="flex flex-col w-screen min-h-screen items-center justify-center pt-12 overflow-hidden select-none text-center pb-44 sm:pb-0">
      <Particles className="absolute inset-0 z-[-5]" quantity={150} refresh />
      <h1 className="z-[-100] opacity-0 font-semibold text-5xl sm:text-7xl lg:text-8xl mb-3 animate-[fadeIn_1000ms_cubic-bezier(0.4,_0,_0.2,_1)_1000ms_forwards]">Youtube but
        <span className="bg-gradient-to-r from-red-600 via-red-800 to-red-600 text-transparent bg-clip-text animate-[fadeIn_1500ms_cubic-bezier(0.4,_0,_0.2,_1)_1000ms_forwards]"> tidier.</span>
      </h1>
      <BlurFade className="w-[60%] md:w-[65%] lg:w-[50%] xl:w-[45%] text-2xl pt-4" delay={1} duration={0.6} inline={false}>
        <span>Customise your Youtube experience with the tidytube browser extension.</span>
        <BlurFade className="pt-1" delay={1} inline>
          <span> tidytube allows you to remove sections of the Youtube UI so you can see more of what you <span className="text-red-600 underline decoration-red-700/40">actually</span> want to see</span>
        </BlurFade>
      </BlurFade>
      <BlurFade className="w-[%] text-2xl xl:pb-4 xl:pt-10" delay={1.2} duration={0.6}>
        <h2 className="pt-20 pb-4 text-4xl font-semibold bg-gradient-to-tr from-white via-slate-300 text-transparent bg-clip-text">Download</h2>
      </BlurFade>
      <div className="flex flex-row justify-evenly items-center pt-10 h-8 w-[80%] sm:w-[60%] md:w-[60%] lg:w-[70%]">
        <BlurFade delay={baseDelayIcons + 0.1} duration={0.2} inline={false}>
          <Link className="hover:cursor-pointer hover:underline" href={chromeDownloadLink} passHref target="_blank">
            <BsBrowserChrome className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out" size={35} title="Chrome Extension Download" />
          </Link>          
        </BlurFade> 
        <BlurFade delay={baseDelayIcons + 0.2} duration={0.2} inline={false}>
          <Link className="hover:cursor-pointer hover:underline" href={firefoxDownloadLink} passHref target="_blank">
            <BsBrowserFirefox className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out" size={35} title="Firefox Extension Download" />
          </Link>  
        </BlurFade>
        <BlurFade delay={baseDelayIcons + 0.3} duration={0.2} inline={false}>
          <Link className="hover:cursor-pointer hover:underline" href={edgeDownloadLink} passHref target="_blank">
            <BsBrowserEdge className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out" size={35} title="Edge Extension Download" />
          </Link>            
        </BlurFade>
      </div>
    </section>
  )
}
