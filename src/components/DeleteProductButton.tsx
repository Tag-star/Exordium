"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this product? This can't be undone.")) return;
    setLoading(true);
    await supabase.from("products").delete().eq("id", productId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
