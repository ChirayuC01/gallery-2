"use client";

import Link from "next/link";
import { useAuthentication } from "@/hooks/useAuthentication";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading, logout } = useAuthentication();
  const pathname = usePathname();

  // Don't render header on the root path or while loading
  if (isLoading || pathname === "/") return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-end items-center">
        <nav>
          <ul className="flex items-center space-x-6 text-base font-medium text-gray-700">
            <li>
              <Link
                href="/home"
                className="hover:text-red-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut size={18} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
