import Link from "next/link";
import { Metadata } from "next";

import { privacyOpening, serverOne } from "@/components/text";

export const metadata: Metadata = {
  title: "Privacy Policy - tidytube"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[55%] xl:w-[55%]">
        <h1 className="text-5xl font-semibold pb-8">privacy policy</h1>
        <p className="text-lg pb-6">{privacyOpening} Throughout this document I will be refering to when the extension removes a part of the Youtube UI as an <em>extension action</em>. This is to save me re-writing this whole phrase every time.</p>
        <div className="text-lg pt-4">
          <h1 className="text-3xl font-semibold pb-6 underline">Server</h1>
          <p className="pb-4">Here is everything that is kept on the server when you use the extension:</p>
          <ul>
            <li className="pb-4">-The information sent to the database when extension actions happen.</li>
            <li className="pb-4">
              {serverOne}
            </li>
            <li className="pb-4">-A hashed (with a secret key) version of your IP is stored in memory for rate limiting purposes.</li>
          </ul>
        </div>
        <div className="text-lg pt-4">
          <h1 className="text-3xl font-semibold pb-6 underline">Extension</h1>
          <p className="pb-4">The extension itself uses a combination of storing data locally (on device) and on the server:</p>
          <h2 className="text-2xl font-semibold pb-6 underline">Data stored locally</h2>
          <ul>
            <li className="pb-4">-Your client ID and uninstall key</li>
            <li className="pb-4">-Settings (what parts of the UI you want to remove + dark mode preference)</li>
            <li className="pb-4">-The extension actions carried on each tab e.g. 2 sections removed on tab A and 4 on tab B</li>
            <li className="pb-4">-Recent extension actions carried out</li>
          </ul>
          <h2 className="text-2xl font-semibold pb-6 underline">Requests made to the server:</h2>
          <ul>
            <li className="pb-4">-When you install the extension a request is made to the server to assign you a client ID and an uninstall key</li>
            <li className="pb-4">-Every 20 minutes a request is made to the server to update it with the extension actions. This is aggregated to form the stats that can be found on the <Link href="/stats" className="hover:cursor-pointer hover:underline">stats page</Link>.</li>
          </ul>
        </div>
        <div className="text-lg pt-4">
          <h1 className="text-3xl font-semibold pb-6 underline">Website</h1>
          <span className="pb-4">This website itself uses <Link className="hover:underline hover:cursor-pointer" href="https://umami.is/" passHref>Umami</Link> for basic site analytics. This allows me to see information like your browser, device and country, but data is completely anonymous and there is nothing available that can identify you uniquely. Umami also uses no tracking cookies. More information is available <Link href="https://umami.is/privacy" className="hover:underline hover:cursor-pointer">here</Link>.</span>
        </div>
        <div className="text-lg pt-6 pb-4">
          <h1 className="text-3xl font-semibold pb-6 underline">Cloudflare</h1>
          <span className="pb-4">The requests to this site and to the API are proxied through Cloudflare. Cloudflare has the potential to log IP addresses, system specs etc. and all of which is out of my control. More information is available <Link href="https://www.cloudflare.com/privacypolicy/" className="hover:underline hover:cursor-pointer">here</Link>.</span>
        </div>
        <div className="text-lg">
          <h1 className="text-3xl font-semibold pb-6 underline">Data Access + Removal requests</h1>
          <p className="pb-4">If you have any of these requests send me an email.</p>
        </div>
        <div className="text-lg">
          <h1 className="text-3xl font-semibold pb-4 underline">Contact info</h1>
          <p className="pb-4">For any additional questions or queries email me at kakajurothings@gmail.com or message me on discord @kakajuro</p>
        </div>
      </div>
    </main>
  )
}
