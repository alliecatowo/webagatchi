import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Webagatchi",
  description: "Your AI Digital Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelFont.variable} antialiased relative h-screen w-screen flex items-center justify-center`}
      >
        <div className="crt-overlay absolute inset-0 z-50" />
        <div className="crt-flicker z-40" />
        <main className="relative z-10 w-full max-w-md h-full max-h-[800px] flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
