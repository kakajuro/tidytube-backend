import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tidytube",
  description: "tidytube is an open source browser extension that allows users to customise the Youtube UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={jost.className} lang="en">
      <div>From Layout</div>
      <body>{children}</body>
    </html>
  );
}
