import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const thumbnail =
    product.product_images?.find((img) => img.is_thumbnail)?.url ||
    product.product_images?.[0]?.url ||
    null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-cream-200 overflow-hidden rounded-sm mb-4">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-wood-400 text-sm">
            No image
          </div>
        )}
        {product.compare_at_price && (
          <span className="absolute top-3 left-3 bg-wood-500 text-cream-50 text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm">
            Sale
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-charcoal-900/80 text-cream-50 text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm">
            Sold Out
          </span>
        )}
      </div>
      <h3 className="font-display text-lg text-charcoal-900 group-hover:text-wood-600 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-charcoal-800">
          KES {product.price.toLocaleString()}
        </span>
        {product.compare_at_price && (
          <span className="text-xs text-charcoal-800/40 line-through">
            KES {product.compare_at_price.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
