"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 border rounded" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
        <div className="px-3 py-1 border rounded">{qty}</div>
        <button className="px-3 py-1 border rounded" onClick={() => setQty((q) => q + 1)}>+</button>
      </div>
      <button
        onClick={() => add(product, qty)}
        className="ml-4 inline-flex items-center gap-2 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Add to cart
      </button>
    </div>
  );
}
