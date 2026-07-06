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
          
            href="mailto:exordiumltd@gmail.com"
            className="text-sm text-cream-100/70 hover:text-wood-300 block"
          >
            exordiumltd@gmail.com
          </a>
          <p className="text-sm text-cream-100/70 mt-1">Nakuru, Kenya</p>

          <div className="flex gap-4 mt-4">
            
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-cream-100/70 hover:text-wood-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
              </svg>
            </a>
          </div>
        </div>
            
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream-100/70 hover:text-wood-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.31-.88-.35-1.86C3.8 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.88-.31 1.86-.35C9.01 3.8 9.33 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm6.56-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
              </svg>
            </a>
            
              href="https://tiktok.com/@yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-cream-100/70 hover:text-wood-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.62h-3.1v13.3a2.6 2.6 0 1 1-2.6-2.6c.24 0 .47.03.7.08V9.85a5.7 5.7 0 0 0-.7-.04A5.72 5.72 0 1 0 15.02 17V9.1c1.24.87 2.75 1.38 4.38 1.38V7.38c-1.02 0-1.98-.32-2.8-.85-.15-.1-.28-.2-.4-.31-.02-.02-.03-.03-.04-.04a4.35 4.35 0 0 1-.56-.36z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-100/10 py-6 text-center text-xs text-cream-100/40">
        © {new Date().getFullYear()} Exordium. All rights reserved.
      </div>
    </footer>
  );
}
