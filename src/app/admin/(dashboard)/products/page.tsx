import { createClient } from "@/lib/supabase/server";
import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = "force-dynamic";

async function getProducts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(*), categories(*)")
    .order("created_at", { ascending: false });
  return (data as Product[]) || [];
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Products</h1>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-wood-300/20 text-charcoal-800/50 text-xs uppercase tracking-wide">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wood-300/10">
            {products.map((product) => {
              const thumb =
                product.product_images?.find((i) => i.is_thumbnail)?.url ||
                product.product_images?.[0]?.url;
              return (
                <tr key={product.id}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-cream-200 rounded-sm overflow-hidden shrink-0">
                        {thumb && <Image src={thumb} alt="" fill className="object-cover" />}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-charcoal-800/60">
                    {product.categories?.name || "—"}
                  </td>
                  <td className="p-4">KES {product.price.toLocaleString()}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-sm ${
                        product.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-charcoal-800/10 text-charcoal-800/50"
                      }`}
                    >
                      {product.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-wood-600 hover:text-wood-700 mr-4"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="p-8 text-center text-sm text-charcoal-800/50">
            No products yet. Click &quot;Add Product&quot; to create your first one.
          </p>
        )}
      </div>
    </div>
  );
}
