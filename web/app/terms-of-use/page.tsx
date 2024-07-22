import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use - tidytube"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">terms of use:</h1>
        <ul className="text-xl">
          <li className="pb-4">
            -By using the extension, you agree to the <Link className="hover:underline hover:cursor-pointer" href="privacy-policy">Privacy Policy</Link>
          </li>
          <li className="pb-4">
            -You can be removed from the service if we see a sufficient reason to do so
          </li>
          <li className="pb-4">
            -If you uninstall the extension submissions to the stats will stay in the database
          </li>
        </ul>
      </div>
    </main>
  )
}