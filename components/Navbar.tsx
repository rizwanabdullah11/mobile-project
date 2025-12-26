"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { totalCount } = useCart();
  const pathname = usePathname();

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Mobile Shop
          </Link>
          <nav className="hidden md:flex gap-4 text-zinc-600">
            <Link href="/products" className={pathname === "/products" ? "font-semibold text-zinc-900" : ""}>
              Products
            </Link>
          </nav>
        </div>

        <div>
          <Link href="/cart" className="inline-flex items-center gap-2">
            <span className="bg-zinc-100 rounded-full px-3 py-1 text-sm">Cart ({totalCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
