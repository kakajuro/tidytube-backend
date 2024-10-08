"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query"

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

import ConfettiFireworks from "@/components/ui/confetti";

export default function Page() {

  const searchParams = useSearchParams();
  const clientID = searchParams.get("clientID");

  const { data, error, isLoading, isPending, isFetching, isError, refetch } = useQuery({
    queryKey: ["updated"],
    retry: 0,
    staleTime: Infinity,
    queryFn: async () => {

      let apiURL;

      if (process.env.NODE_ENV === "development") {
        process.env.IS_DOCKERISED ? apiURL = "http://server:3000" : apiURL = "http://localhost:8000"
      } else {
        apiURL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
      }

      let response = await fetch(`${apiURL}/api/me`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "client-id": clientID!
        }
      });

      if (!response?.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests");
        } else if (response.status === 401) {
          throw new Error("Invalid credentials");
        } else if (response.status === 500) {
          throw new Error("An internal server error occurred");
        }

      }
      
      let jsonRes = await response?.json();
      return jsonRes

    }
  })

  useEffect(() => {
    if (!clientID) {
      redirect("/");
    } else {
      refetch();
    }
  }, []);

  if (isPending || isLoading || isFetching) {
    return (
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    console.log("Failed to uninstall user");

    return (
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center items-center justify-center">
          <h1 className="text-9xl font-black text-gray-200">Error</h1>

          <p className="text-2xl font-bold tracking-tight text-red-600 sm:text-4xl">Whoops.</p>

          <p className="mt-4 text-gray-500">Something went wrong: {error.message}</p>

          <Link
            href="./"
            className="mt-6 inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  if (data) {

  	// Determine whether to play confetti animation
  	let hasAnimated = sessionStorage.getItem("hasAnimatedFireworksUpdated");

  	if (hasAnimated != "true") {
  		ConfettiFireworks();
  		sessionStorage.setItem("hasAnimatedFireworksUpdated", "true");
  	}

  	return (
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center items-center justify-center">
          <h1 className="text-7xl font-bold text-gray-200 pb-8">tidytube has been updated!</h1>
  
          <p className="text-2xl font-bold tracking-tight text-red-600 sm:text-4xl pb-6">Thank you for continuing to use tidytube &lt;3</p>
  
          <p className="mt-4 text-gray-200 pb-8 text-lg">Feeling generous? Consider <span className="underline decoration-red-700/40 decoration-double decoration-2">supporting</span> the extension!</p>
  
          <Link
            href="./donate"
            className="mt-2 inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Donate
          </Link>
        </div>
      </div>
    )
  }

}