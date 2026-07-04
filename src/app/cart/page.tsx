"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, X } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <p className="text-charcoal-800/60 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <div className="divide-y divide-wood-300/20">
          {items.map((item) => (
            <div key={item.product_id} className="flex gap-4 py-6">
              <div className="relative w-24 h-24 bg-cream-200 rounded-sm overflow-hidden shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <Link href={`/product/${item.slug}`} className="font-display text-lg hover:text-wood-600">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="text-charcoal-800/40 hover:text-charcoal-900"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-sm text-charcoal-800/60 mb-3">
                  KES {item.price.toLocaleString()}
                </p>
                <div className="flex items-center border border-wood-300/50 rounded-sm w-fit">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="p-2 hover:bg-cream-100"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-sm w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="p-2 hover:bg-cream-100"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cream-100 rounded-sm p-6 h-fit">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-charcoal-800/70">Subtotal</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-charcoal-800/50 mb-4">
            Shipping calculated at checkout.
          </p>
          <Link href="/checkout" className="btn-primary w-full">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
