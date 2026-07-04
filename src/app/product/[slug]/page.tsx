import { createClient } from "@/lib/supabase/server";
import { Product } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*), categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data as Product | null;
}

async function getRelated(categoryId: string | null, currentId: string) {
  if (!categoryId) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", currentId)
    .limit(4);
  return (data as Product[]) || [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const related = await getRelated(product.category_id, product.id);
  const images = (product.product_images || []).sort((a, b) => a.sort_order - b.sort_order);
  const mainImage = images.find((i) => i.is_thumbnail) || images[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-cream-200 rounded-sm overflow-hidden mb-3">
            {mainImage ? (
              <Image src={mainImage.url} alt={product.name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-wood-400 text-sm">
                No image available
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative aspect-square bg-cream-200 rounded-sm overflow-hidden">
                  <Image src={img.url} alt={product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.categories && (
            <p className="text-xs uppercase tracking-wide text-wood-600 mb-2">
              {product.categories.name}
            </p>
          )}
          <h1 className="font-display text-4xl mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl text-charcoal-900">
              KES {product.price.toLocaleString()}
            </span>
            {product.compare_at_price && (
              <span className="text-sm text-charcoal-800/40 line-through">
                KES {product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-charcoal-800/80 leading-relaxed mb-8">{product.description}</p>
          )}

          <div className="mb-8">
            <AddToCartForm product={product} />
            <p className="text-xs text-charcoal-800/50 mt-3">
              {product.stock > 0 ? `${product.stock} in stock` : "Currently unavailable"}
            </p>
          </div>

          <dl className="border-t border-wood-300/30 pt-6 space-y-3">
            {product.material && (
              <div className="flex text-sm">
                <dt className="w-32 text-charcoal-800/50">Material</dt>
                <dd>{product.material}</dd>
              </div>
            )}
            {product.dimensions && (
              <div className="flex text-sm">
                <dt className="w-32 text-charcoal-800/50">Dimensions</dt>
                <dd>{product.dimensions}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
