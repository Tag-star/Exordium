import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

export const revalidate = 60;

async function getFeaturedProducts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("is_active", true)
    .eq("featured", true)
    .limit(4);
  return (data as Product[]) || [];
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-charcoal-900 text-cream-50">
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-wood-300 text-sm uppercase tracking-[0.2em] mb-4">
              Est. Nakuru
            </p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.1] mb-6">
              Furniture for a <em className="italic text-wood-300">life</em> well lived.
            </h1>
            <p className="text-cream-100/70 text-lg leading-relaxed mb-8 max-w-md">
              Thoughtfully designed, built to last. Explore the Exordium
              collection — pieces made for the way you actually live.
            </p>
            <Link href="/shop" className="btn-primary bg-wood-500 hover:bg-wood-600">
              Shop the Collection
            </Link>
          </div>
          <div className="relative aspect-square bg-wood-700/30 rounded-sm border border-wood-300/20 flex items-center justify-center">
            <Image src="/home-profile.jpeg" alt="Exordium furniture" fill className="object-contain" priority />
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Living Room", slug: "living-room", image: "/categories/living-room.jpeg" },
            { name: "Bedroom", slug: "bedroom", image: "/categories/bedroom.jpg" },
            { name: "Dining", slug: "dining", image: "/categories/dining.jpg" },
            { name: "Outdoor", slug: "outdoor", image: "/categories/outdoor.jpg" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-square bg-cream-200 rounded-sm overflow-hidden flex items-end p-5"
            >
              <span className="font-display text-lg text-charcoal-900 group-hover:text-wood-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl">Featured Pieces</h2>
            <Link href="/shop" className="text-sm uppercase tracking-wide text-wood-600 hover:text-wood-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Value props */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="font-display text-xl mb-2">Built to Last</h3>
            <p className="text-sm text-charcoal-800/70">
              Solid materials and craftsmanship designed for daily life, not just the showroom.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Nationwide Delivery</h3>
            <p className="text-sm text-charcoal-800/70">
              We deliver across Kenya, with careful handling for every piece.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Flexible Payment</h3>
            <p className="text-sm text-charcoal-800/70">
              Pay via M-Pesa or card — whichever is easiest for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
