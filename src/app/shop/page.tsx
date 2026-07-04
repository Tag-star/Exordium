import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/lib/types";
import Link from "next/link";

export const revalidate = 60;

async function getCategories() {
  const supabase = createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return (data as Category[]) || [];
}

async function getProducts(categorySlug?: string, search?: string) {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*, product_images(*), categories(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data } = await query;
  return (data as Product[]) || [];
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(searchParams.category, searchParams.q),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl mb-2">Shop</h1>
        <p className="text-charcoal-800/60 text-sm">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        {/* Filters sidebar */}
        <aside>
          <form action="/shop" method="get" className="mb-8">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              defaultValue={searchParams.q}
              className="input-field text-sm"
            />
          </form>

          <h4 className="text-xs uppercase tracking-wide text-charcoal-800/50 mb-3">
            Categories
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/shop"
                className={`text-sm ${
                  !searchParams.category
                    ? "text-wood-600 font-medium"
                    : "text-charcoal-800/70 hover:text-wood-600"
                }`}
              >
                All Products
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className={`text-sm ${
                    searchParams.category === cat.slug
                      ? "text-wood-600 font-medium"
                      : "text-charcoal-800/70 hover:text-wood-600"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product grid */}
        <div>
          {products.length === 0 ? (
            <p className="text-charcoal-800/60 text-sm py-20 text-center">
              No products found. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
