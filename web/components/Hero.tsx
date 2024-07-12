import BlurFade from "@/components/magicui/blur-fade";
import Particles from "./magicui/particles";

export default function Hero() {
  return (
    <section className="flex flex-col w-screen min-h-screen items-center justify-center pb-30 overflow-hidden pointer-events-none select-none text-center">
      <Particles className="absolute inset-0 z-[-5]" quantity={150} refresh />
      <BlurFade className="mb-3" delay={0.6} inView>
        <h1 className="font-semibold text-5xl sm:text-7xl md:text-8xl">Youtube but
          <BlurFade className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-transparent bg-clip-text" delay={1} inline>
            <span> tidier.</span>
          </BlurFade>  
        </h1>
      </BlurFade>
      <BlurFade className="w-[50%] text-2xl" delay={1.2} duration={0.6}>
        <span>Customise your Youtube experience with the tidytube browser extension. </span>
        <BlurFade className="pt-1" delay={1.2} inline>
          <span>Tidytube allows you to remove parts of the Youtube UI so you can see more of what you <a className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-transparent bg-clip-text underline decoration-red-700/40">actually</a> want to see</span>
        </BlurFade>
      </BlurFade>
      <h2>Download</h2>
      <div>Icons go here</div>
    </section>
  )
}
