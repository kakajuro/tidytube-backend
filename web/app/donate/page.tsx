import Link from "next/link";
import { Metadata } from "next";

import { donationMessage, donationMessageTwo } from "@/components/text";

export const metadata: Metadata = {
  title: "Donate - tidytube"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <h1 className="text-5xl font-semibold pb-8">donate</h1>
        <p className="font-medium text-xl pb-4">{donationMessage}</p>
        <p className="font-medium text-xl pb-4">{donationMessageTwo}</p>
        <div className="flex flex-col pt-4 text-xl">
          <h2 className="font-semibold text-3xl pb-6">recurring:</h2>
          <ul>
            <li>-Github</li>
          </ul>
        </div>
        <div className="flex flex-col pt-12 text-xl">
          <h2 className="font-semibold text-3xl pb-6">one-time:</h2>
          <ul>
            <li>-Github</li>
            <li>-Ko-fi</li>
            <li>-Paypal</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
