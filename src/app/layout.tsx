import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Rana Jain Website",
  description: "Converted from Angular to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen text-black">
        <main className="container flex-grow">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
