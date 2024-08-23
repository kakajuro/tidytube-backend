"use client";

import { useAtom, useSetAtom } from "jotai";
import { modalOpenAtom } from "@/lib/store";

import useIsLargeScreen from "./hooks/useIsLargeScreen";

import Image from "next/image";
import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import tidytubeIcon from "@/app/images/icons/icon32.png";


function MobileNav() {

  const setModalOpen = useSetAtom(modalOpenAtom);

  const handleClick = () => {
    setModalOpen(false);
  } 

  return (
    <section className="z-100 fixed bg-custom-dark w-screen h-[50vh] flex flex-col items-center justify-center md:hidden">
      <div className="relative flex flex-col items-center justify-center pt-32 w-screen">
        <div className="ml-auto pr-6 pb-2">
          <button onClick={handleClick}>
            <MdClose className="hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="Close navigation menu" size={25}  />
          </button>
        </div>
        <Link onClick={handleClick} className="pb-4" href="./">
          <Image src={tidytubeIcon} alt="tidytube icon" />
        </Link>
        <ul className="flex flex-row items-center gap-6 text-sm">
          <li>
            <Link onClick={handleClick} className="text-lg text-white transition hover:text-white/75 hover:underline" href="./"> Home </Link>
          </li>
          <li>
            <Link onClick={handleClick} className="text-lg text-white transition hover:text-white/75 hover:underline" href="/about"> About </Link>
          </li>
          <li>
            <Link onClick={handleClick} className="text-lg text-white transition hover:text-white/75 hover:underline" href="/stats"> Stats </Link>
          </li>
          <li>
            <Link onClick={handleClick} className="text-lg text-white transition hover:text-white/75 hover:underline" href="/donate"> Donate </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default function Navbar() {

  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);

  const { isLargeScreen } = useIsLargeScreen();
  
  isLargeScreen ? setModalOpen(false) : null;

  return (
    <header className='z-[100] h-16 p-4 backdrop-blur-sm flex items-center justify-center'>
      {
        modalOpen ? (<MobileNav />) : (<></>)
      }

      <Link className="pr-12" href="./">
        <Image src={tidytubeIcon} alt="tidytube icon" />
      </Link>

      <div className="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="./"> Home </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="/about"> About </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="/stats"> Stats </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="/donate"> Donate </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 flex-row">
          <div className="sm:flex sm:gap-4 md:gap-8">
            <Link href="https://twitter.com/tidytubeext" passHref target="_blank">
              <FaTwitter className="hidden md:block hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="tidytube twitter account" size={25}  />
            </Link>
            <Link href="https://github.com/kakajuro/tidytube" passHref target="_blank">
              <FaGithub className="hidden md:block hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="Extension Repository" size={25}  />  
            </Link>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                color="red"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>   
  )
}
