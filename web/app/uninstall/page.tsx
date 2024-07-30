"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

export default async function Page() {

  const searchParams = useSearchParams();

  const clientID = searchParams.get("clientID");
  const uninstallKey = searchParams.get("uninstallKey");

  if (!clientID || !uninstallKey) {
    redirect("./")
  } else {

    let apiURL;

    if (process.env.NODE_ENV === "development") {
      process.env.IS_DOCKERISED ? apiURL = "http://server:3000" : apiURL = "http://localhost:8000"
    } else {
      apiURL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
    }

    let res = await fetch(`${apiURL}/api/uninstall` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "client-id": clientID!,
        "uninstall-key": uninstallKey!
      }
    });

    if (!res?.ok) {
      console.log("Failed to uninstall user");
      redirect("./");
    } else {
      console.log("Succuessfully uninstalled user");
        return (
        <div className="grid h-screen place-content-center px-4">
          <div className="text-center items-center justify-center">
            <h1 className="text-7xl font-bold text-gray-200 pb-8">tidytube uninstalled :(</h1>
    
            <p className="text-2xl font-bold tracking-tight text-red-600 sm:text-4xl pb-6">We&apos;re sorry to see you go.</p>
    
            <p className="mt-4 text-gray-500 pb-8">Extension uninstalled + server data deleted successfully, thank you for using tidytube.</p>
    
            <Link
              href="./"
              className="mt-6 inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Reconsider?
            </Link>
          </div>
        </div>
      )
    }
  
  }

}