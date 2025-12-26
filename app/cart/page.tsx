"use client";

import Link from "next/link";
import { useCart } from "../../components/CartContext";

export default function CartPage() {
  const { items, updateQty, remove, clear, totalPrice } = useCart();

  if (items.length === 0)
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-4 text-zinc-600">Add some products to get started.</p>
        <div className="mt-6">
          <Link href="/products" className="rounded bg-indigo-600 px-4 py-2 text-white">
            Browse products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <div className="mt-6 space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-4 border rounded p-4">
            <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-zinc-600">${it.price}</div>
              <div className="mt-2 flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}>-</button>
                <div className="px-3 py-1 border rounded">{it.qty}</div>
                <button className="px-2 py-1 border rounded" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                <button className="ml-4 text-sm text-red-600" onClick={() => remove(it.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</div>
        <div className="flex items-center gap-2">
          <button className="rounded bg-gray-100 px-4 py-2" onClick={() => clear()}>
            Clear
          </button>
          <button className="rounded bg-indigo-600 px-4 py-2 text-white" onClick={() => alert('Checkout simulated — integrate Stripe or other provider later')}>
            Checkout (simulate)
          </button>
        </div>
      </div>
    </div>
  );
}
