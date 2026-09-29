import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./navbar";
import { Analytics } from "@vercel/analytics/next"


const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});


const geistPixel = localFont({
  src: [
    {
      path: "./fonts/GeistPixel-Regular-VariableFont_ELSH.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-pixel",
});

export const metadata: Metadata = {
  title: "Aayushi",
  description: "Aayushi's world and experiences"}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${ebGaramond.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
        {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
