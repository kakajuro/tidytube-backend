import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">credits</h1>
        <ul className="text-xl">
          <li className="pb-4">
            Created + maintined by <Link className="hover:underline hover:cursor-pointer" href="https://github.com/kakajuro" passHref target="_blank">@kakajuro</Link>
          </li>
          <li className="pb-4">Thanks to all the <Link className="hover:underline hover:cursor-pointer" href="https://github.com/kakajuro/tidytube/graphs/contributors" passHref target="_blank">contributors</Link>!</li>
          <li className="pb-4">
            <Link className="hover:underline hover:cursor-pointer" href="https://sponsor.ajay.app" passHref target="_blank">Sponsorblock </Link> 
            (<Link className="hover:underline hover:cursor-pointer" href="https://ajay.app/" passHref target="_blank">Ajay Ramachandran</Link>) 
            - Although I am not directly affiliated with Ajay or SponsorBlock, I took alot of inspiration from this extension.</li>
          <li className="pb-4">All icons provided by <Link className="hover:underline hover:cursor-pointer" href="https://react-icons.github.io/react-icons/" passHref target="_blank">react-icons</Link></li>
          <li className="pb-4">Logo: <Link className="hover:underline hover:cursor-pointer" href="https://github.com/kakajuro" passHref target="_blank">@kakajuro</Link></li>
          <li className="pb-4">and finally a HUGE thank you to all the <Link className="hover:underline hover:cursor-pointer" href="https://github.com/sponsors/kakajuro" passHref target="_blank">sponsors</Link> and supporters!</li>
        </ul>
      </div>
    </main>
  )
}
