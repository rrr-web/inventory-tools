"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/borrowing", label: "Peminjaman Tools" },
  { href: "/tools", label: "Stok Tools Room" },
  { href: "/warehouse", label: "Stok Tools Gudang" },
  { href: "/requests", label: "Permintaan Tools" },
];

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <main className="min-h-screen bg-white flex text-black">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 h-screen w-64 z-40 transition-transform duration-300 ease-in-out bg-gray-100",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 text-2xl font-bold border-b">
        Inventory Tools
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}            // FIX
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg transition-all duration-200",
                isActive(item.href)
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-200"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <section className="flex-1 p-6 lg:p-8 pt-20 lg:pt-6 min-w-0">
        {children}
      </section>
    </main>
  );
}
