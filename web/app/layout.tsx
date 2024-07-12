import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tidytube - Customise Youtube's UI - Browser Extension",
  description: "tidytube is an open source browser extension that allows users to customise the Youtube UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`bg-custom-dark text-white overflow-x-hidden ${jost.className}`} lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
