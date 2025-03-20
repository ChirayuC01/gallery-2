import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
        {/* Navbar */}
        {/* <nav className="bg-white shadow-md py-4">
          <div className="container flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-black">
              Rana Jain
            </Link>
            <div className="space-x-4">
              <Link href="/home" className="text-gray-700 hover:text-blue-500">
                Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
              <Link
                href="/nanas_signpost"
                className="text-gray-700 hover:text-blue-500"
              >
                Signpost
              </Link>
            </div>
          </div>
        </nav> */}

        {/* Main Content */}
        <main className="container flex-grow py-6">{children}</main>

        {/* Footer */}
        {/* <footer className="bg-gray-800 text-white text-center py-4">
          <p>© 2025 Rana Jain. All rights reserved.</p>
        </footer> */}
      </body>
    </html>
  );
}
