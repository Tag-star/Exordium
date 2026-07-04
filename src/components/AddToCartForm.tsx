"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";
import { Minus, Plus, Check } from "lucide-react";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const thumbnail =
    product.product_images?.find((img) => img.is_thumbnail)?.url ||
    product.product_images?.[0]?.url ||
    null;

  function handleAdd() {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: thumbnail,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (product.stock === 0) {
    return (
      <button disabled className="btn-secondary opacity-40 cursor-not-allowed w-full md:w-auto">
        Sold Out
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-wood-300/50 rounded-sm">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-3 hover:bg-cream-100"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="px-4 text-sm w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="p-3 hover:bg-cream-100"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
      <button onClick={handleAdd} className="btn-primary flex-1 md:flex-none md:px-10">
        {added ? (
          <>
            <Check size={16} /> Added
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
