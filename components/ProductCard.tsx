"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-44 w-full">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium text-zinc-900">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-600">{product.short}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">${product.price}</div>
          <Link href={`/products/${product.slug}`} className="text-sm text-indigo-600">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
