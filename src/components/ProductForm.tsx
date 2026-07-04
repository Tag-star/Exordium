"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product, Category, ProductImage } from "@/lib/types";
import ImageUploader from "@/components/ImageUploader";

type Props = {
  categories: Category[];
  product?: Product; // undefined = creating new
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [productId, setProductId] = useState<string | null>(product?.id || null);
  const [images, setImages] = useState<ProductImage[]>(product?.product_images || []);

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price?.toString() || "",
    compare_at_price: product?.compare_at_price?.toString() || "",
    category_id: product?.category_id || "",
    material: product?.material || "",
    dimensions: product?.dimensions || "",
    stock: product?.stock?.toString() || "0",
    description: product?.description || "",
    is_active: product?.is_active ?? true,
    featured: product?.featured ?? false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      slug: product?.slug || slugify(form.name),
      price: parseFloat(form.price),
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      category_id: form.category_id || null,
      material: form.material || null,
      dimensions: form.dimensions || null,
      stock: parseInt(form.stock, 10),
      description: form.description || null,
      is_active: form.is_active,
      featured: form.featured,
    };

    if (productId) {
      const { error } = await supabase.from("products").update(payload).eq("id", productId);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();
      if (error || !data) {
        setError(error?.message || "Could not create product.");
        setSaving(false);
        return;
      }
      setProductId(data.id);
      setSaving(false);
      // Stay on the page so they can now upload images against the real product id
      router.push(`/admin/products/${data.id}/edit`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="label-field">Product Name</label>
          <input
            required
            className="input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Price (KES)</label>
          <input
            required
            type="number"
            step="0.01"
            className="input-field"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Compare-at Price (optional)</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            value={form.compare_at_price}
            onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Category</label>
          <select
            className="input-field"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field">Stock Quantity</label>
          <input
            required
            type="number"
            className="input-field"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Material</label>
          <input
            className="input-field"
            placeholder="e.g. Solid oak, leather"
            value={form.material}
            onChange={(e) => setForm({ ...form, material: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Dimensions</label>
          <input
            className="input-field"
            placeholder='e.g. 180 x 90 x 75 cm'
            value={form.dimensions}
            onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label-field">Description</label>
          <textarea
            rows={4}
            className="input-field"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Visible on storefront
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured on homepage
        </label>
      </div>

      <ImageUploader productId={productId} images={images} onChange={setImages} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving..." : productId ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
