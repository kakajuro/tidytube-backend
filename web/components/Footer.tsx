import Image from "next/image";
import Link from "next/link";

import tidytubeIcon from "@/app/images/icons/icon32.png";

export default function Footer() {

  return (
    <footer>
      <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-center text-red-700 select-none">
          <Image src={tidytubeIcon} alt="tidytube icon" />
          <h1 className="pl-4 text-3xl font-semibold">tidytube</h1>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="./"> Home </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="about"> About </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="stats"> Stats </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="donate"> Donate </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="privacy-policy"> Privacy Policy </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="tos"> Terms Of Use </Link>
          </li>
          <li>
            <Link className="text-gray-700 transition hover:text-gray-700/75" href="credits"> Credits </Link>
          </li>
        </ul>
        <p className="mt-8 text-center text-sm text-gray-500">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}