"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=living-room", label: "Living Room" },
  { href: "/shop?category=bedroom", label: "Bedroom" },
  { href: "/shop?category=dining", label: "Dining" },
  { href: "/shop?category=outdoor", label: "Outdoor" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur border-b border-wood-300/30">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl tracking-wide text-charcoal-900">
          Exordium
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide text-charcoal-800 hover:text-wood-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:text-wood-600 transition-colors">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-wood-500 text-cream-50 text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-6 border-t border-wood-300/30">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm uppercase tracking-wide text-charcoal-800 border-b border-wood-300/20"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
