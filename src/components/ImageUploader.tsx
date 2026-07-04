"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductImage } from "@/lib/types";
import { Upload, X, Star, Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  productId: string | null; // null when creating a new product (images added after first save)
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
};

export default function ImageUploader({ productId, images, onChange }: Props) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      if (!productId) {
        alert("Please save the product first, then add images.");
        return;
      }

      setUploading(true);

      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${productId}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, file);

        if (uploadError) {
          console.error(uploadError);
          alert(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);

        const { data: newImage, error: dbError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            url: publicUrlData.publicUrl,
            sort_order: images.length,
            is_thumbnail: images.length === 0, // first image becomes thumbnail by default
          })
          .select()
          .single();

        if (dbError) {
          console.error(dbError);
          continue;
        }

        onChange([...images, newImage as ProductImage]);
      }

      setUploading(false);
    },
    [productId, images, onChange, supabase]
  );

  async function handleDelete(image: ProductImage) {
    if (!confirm("Remove this image?")) return;

    await supabase.from("product_images").delete().eq("id", image.id);

    // best-effort removal from storage (path is the part after the bucket public URL)
    const pathMatch = image.url.split("/product-images/")[1];
    if (pathMatch) {
      await supabase.storage.from("product-images").remove([pathMatch]);
    }

    onChange(images.filter((i) => i.id !== image.id));
  }

  async function handleSetThumbnail(image: ProductImage) {
    await supabase
      .from("product_images")
      .update({ is_thumbnail: false })
      .eq("product_id", productId!);
    await supabase
      .from("product_images")
      .update({ is_thumbnail: true })
      .eq("id", image.id);

    onChange(images.map((i) => ({ ...i, is_thumbnail: i.id === image.id })));
  }

  return (
    <div>
      <label className="label-field">Product Images</label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
          dragOver ? "border-wood-500 bg-wood-50" : "border-wood-300/50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-charcoal-800/60">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <>
            <Upload size={24} className="mx-auto mb-2 text-charcoal-800/40" />
            <p className="text-sm text-charcoal-800/60 mb-2">
              Drag and drop images here, or
            </p>
            <label className="btn-secondary text-xs cursor-pointer inline-flex">
              Browse Files
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
            {!productId && (
              <p className="text-xs text-wood-600 mt-3">
                Save the product first, then upload images.
              </p>
            )}
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {images
            .slice()
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((img) => (
              <div key={img.id} className="relative group aspect-square rounded-sm overflow-hidden bg-cream-200">
                <Image src={img.url} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleSetThumbnail(img)}
                    className={`p-1.5 rounded-full ${
                      img.is_thumbnail ? "bg-wood-500 text-white" : "bg-white/90 text-charcoal-900"
                    }`}
                    title="Set as thumbnail"
                  >
                    <Star size={14} fill={img.is_thumbnail ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img)}
                    className="p-1.5 rounded-full bg-white/90 text-red-600"
                    title="Delete image"
                  >
                    <X size={14} />
                  </button>
                </div>
                {img.is_thumbnail && (
                  <span className="absolute top-1 left-1 bg-wood-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm">
                    Main
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
