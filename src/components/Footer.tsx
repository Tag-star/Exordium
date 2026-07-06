import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

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
          <h4 className="text-xs uppercase tracking-wide text-cream-100/50 mb-4">Contact</h4>
          
            href="mailto:exordiumltd@gmail.com"
            className="text-sm text-cream-100/70 hover:text-wood-300 block"
          >
            exordiumltd@gmail.com
          </a>
          <p className="text-sm text-cream-100/70 mt-1">Nakuru, Kenya</p>
          <SocialLinks />
        </div>
      </div>
      <div className="border-t border-cream-100/10 py-6 text-center text-xs text-cream-100/40">
        © {new Date().getFullYear()} Exordium. All rights reserved.
      </div>
    </footer>
  );
}
