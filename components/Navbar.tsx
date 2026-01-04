"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalCount } = useCart();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            📱 Zameer
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-zinc-600">
            <Link 
              href="/products" 
              className={`hover:text-zinc-900 transition-colors ${pathname === "/products" ? "font-semibold text-zinc-900" : ""}`}
            >
              Products
            </Link>
            <Link 
              href="/admin" 
              className={`hover:text-zinc-900 transition-colors ${pathname.startsWith("/admin") ? "font-semibold text-zinc-900" : ""}`}
            >
              Admin
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link href="/cart" className="relative">
              <div className="bg-indigo-100 hover:bg-indigo-200 rounded-full p-2 transition-colors">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
              </div>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-2">
              <Link 
                href="/products" 
                className={`block px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${pathname === "/products" ? "font-semibold text-indigo-600 bg-indigo-50" : "text-zinc-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/admin" 
                className={`block px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${pathname.startsWith("/admin") ? "font-semibold text-indigo-600 bg-indigo-50" : "text-zinc-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
