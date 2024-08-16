"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function Page() {

  const searchParams = useSearchParams();

  const clientID = searchParams.get("clientID");
  const uninstallKey = searchParams.get("uninstallKey");

  const { data, isError, isPending, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['uninstall'],
    enabled: false,
    staleTime: Infinity,
    retry: 0,
    queryFn: async () => {

      let apiURL;

      if (process.env.NODE_ENV === "development") {
        process.env.IS_DOCKERISED ? apiURL = "http://server:3000" : apiURL = "http://localhost:8000"
      } else {
        apiURL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
      }

      let response = await fetch(`${apiURL}/api/uninstall` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "client-id": clientID!,
          "uninstall-key": uninstallKey!
        }
      })

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
    if (!clientID || !uninstallKey) {
      redirect("./");
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