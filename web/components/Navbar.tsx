"use client";

import Image from "next/image";
import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"

import tidytubeIcon from "@/app/icons/icon32.png";


export default function Navbar() {
  return (
    <header className='z-[100] h-16 p-4 backdrop-blur-sm flex items-center justify-center'>
      <a className="pr-12" href="#">
        <Image src={tidytubeIcon} alt="tidytube icon" />
      </a>

      <div className="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="#"> Home </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="#"> About </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="#"> Stats </Link>
            </li>
            <li>
              <Link className="text-lg text-white transition hover:text-white/75 hover:underline" href="#"> Donate </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 flex-row">
          <div className="sm:flex sm:gap-4 md:gap-8">
            <FaGithub className="hidden md:block hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="Extension Repository" size={25}  />  
            <FaDiscord className="hidden md:block hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="tidytube discord server" size={25}  />
            <FaTwitter className="hidden md:block hover:cursor-pointer hover:text-red-600 transition ease-in-out" title="tidytube twitter account" size={25}  />

          <button
            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
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
