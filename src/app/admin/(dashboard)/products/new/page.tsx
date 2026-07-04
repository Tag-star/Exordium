import { createClient } from "@/lib/supabase/server";
import { Category } from "@/lib/types";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

async function getCategories() {
  const supabase = createClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return (data as Category[]) || [];
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
