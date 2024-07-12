"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Particles from "./magicui/particles";

import { CustomIcon } from "./CustomIcon";
import { BsBrowserChrome } from "react-icons/bs";
import { BsBrowserEdge } from "react-icons/bs";
import { BsBrowserFirefox } from "react-icons/bs";
import { FaOpera } from "react-icons/fa6";

export default function Hero() {

  const baseDelayIcons = 1.2;

  return (
    <section className="flex flex-col w-screen min-h-screen items-center justify-center pt-36 overflow-hidden select-none text-center">
      <Particles className="absolute inset-0 z-[-5]" quantity={150} refresh />
      <BlurFade className="mb-3" delay={0.4} inView>
        <h1 className="font-semibold text-5xl sm:text-7xl lg:text-8xl">Youtube but
          <BlurFade className="bg-gradient-to-r from-red-600 via-red-800 to-red-600 text-transparent bg-clip-text" delay={0.8} inline>
            <span> tidier.</span>
          </BlurFade>  
        </h1>
      </BlurFade>
      <BlurFade className="w-[50%] text-2xl" delay={1} duration={0.6}>
        <span>Customise your Youtube experience with the tidytube browser extension. </span>
        <BlurFade className="pt-1" delay={1} inline>
          <span>Tidytube allows you to remove parts of the Youtube UI so you can see more of what you <a className="text-red-600 underline decoration-red-700/40">actually</a> want to see</span>
        </BlurFade>
      </BlurFade>
      <BlurFade className="w-[50%] text-2xl" delay={1.2} duration={0.6}>
        <h2 className="pt-20 text-4xl font-semibold bg-gradient-to-tr from-white via-slate-300 from-white text-transparent bg-clip-text">Download</h2>
      </BlurFade>
      <div className="flex flex-row justify-evenly items-center pt-10 h-8 w-[40%]">
        <BlurFade delay={baseDelayIcons + 0.1} duration={0.2} inline={false}>
          <CustomIcon 
            icon={BsBrowserChrome}
            className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out"
            size={35}
            title="Chrome Extension Download"
          />
        </BlurFade>
        <BlurFade delay={baseDelayIcons + 0.2} duration={0.2} inline={false}>
          <CustomIcon 
            icon={BsBrowserFirefox}
            className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out"
            size={35}
            title="Firefox Extension Download"
          />
        </BlurFade>
        <BlurFade delay={baseDelayIcons + 0.3} duration={0.2} inline={false}>
          <CustomIcon 
            icon={BsBrowserEdge}
            className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out"
            size={35}
            title="Edge Extension Download"
          />
        </BlurFade>
        <BlurFade delay={baseDelayIcons + 0.4} duration={0.2} inline={false}>
          <CustomIcon 
            icon={FaOpera}
            className="hover:cursor-pointer hover:text-red-600 hover:-translate-y-1 duration-500 transition-all ease-in-out"
            size={35}
            title="Opera Extension Download"
          />
        </BlurFade>
      </div>
    </section>
  )
}
