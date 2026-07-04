import { createClient } from "@/lib/supabase/server";
import { Category, Product } from "@/lib/types";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  const supabase = createClient();
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*, product_images(*)").eq("id", id).single(),
    supabase.from("categories").select("*").order("name"),
  ]);
  return { product: product as Product | null, categories: (categories as Category[]) || [] };
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { product, categories } = await getData(params.id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
