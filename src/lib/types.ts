export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  is_thumbnail: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  material: string | null;
  dimensions: string | null;
  stock: number;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  categories?: Category | null;
};

export type CartItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  slug: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  payment_method: "stripe" | "mpesa";
  payment_status: "pending" | "paid" | "failed";
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
};
