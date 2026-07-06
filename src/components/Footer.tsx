import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-display text-2xl mb-3">Exordium</h3>
          <p className="text-sm text-cream-100/70 leading-relaxed">
            Furniture built to last, designed with warmth and intention.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-cream-100/50 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop?category=living-room" className="hover:text-wood-300">Living Room</Link></li>
            <li><Link href="/shop?category=bedroom" className="hover:text-wood-300">Bedroom</Link></li>
            <li><Link href="/shop?category=dining" className="hover:text-wood-300">Dining</Link></li>
            <li><Link href="/shop?category=outdoor" className="hover:text-wood-300">Outdoor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-cream-100/50 mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-wood-300">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-wood-300">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-cream-100/50 mb-4">Contact</h4>
          <p className="text-sm text-cream-100/70">exordiumltd@gmail.come</p>
          <p className="text-sm text-cream-100/70 mt-1">Nakuru, Kenya</p>
        </div>
      </div>

      <div className="border-t border-cream-100/10 py-6 text-center text-xs text-cream-100/40">
        © {new Date().getFullYear()} Exordium. All rights reserved.
      </div>
    </footer>
  );
}
