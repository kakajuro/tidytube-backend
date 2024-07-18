import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - tidytube"
}

export default function page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen p-12">
      Donate
    </main>
  )
}
