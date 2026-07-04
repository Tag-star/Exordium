-- ============================================================
-- EXORDIUM E-COMMERCE — SUPABASE SCHEMA
-- Run this once in Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- CATEGORIES
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- PRODUCTS
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2), -- optional "was" price for sales
  category_id uuid references categories(id) on delete set null,
  material text,
  dimensions text,
  stock int not null default 0,
  is_active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PRODUCT IMAGES
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  is_thumbnail boolean not null default false,
  created_at timestamptz default now()
);

-- ORDERS
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address text not null,
  items jsonb not null, -- [{product_id, name, price, quantity, image}]
  subtotal numeric(10,2) not null,
  total numeric(10,2) not null,
  payment_method text not null default 'stripe', -- 'stripe' | 'mpesa'
  payment_status text not null default 'pending', -- 'pending' | 'paid' | 'failed'
  order_status text not null default 'pending', -- 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at timestamptz default now()
);

-- updated_at trigger for products
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
before update on products
for each row execute procedure set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- Public can READ active products/categories/images.
-- Only authenticated (admin) users can write anything.
-- Orders: public can INSERT (checkout), only admin can read/update.
-- ============================================================

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;

-- Categories: public read, admin write
create policy "Public can view categories" on categories
  for select using (true);
create policy "Admins can manage categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Products: public can view active products, admin can manage all
create policy "Public can view active products" on products
  for select using (is_active = true or auth.role() = 'authenticated');
create policy "Admins can manage products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Product images: public read, admin write
create policy "Public can view product images" on product_images
  for select using (true);
create policy "Admins can manage product images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Orders: anyone can create an order (checkout), only admin can view/manage
create policy "Anyone can place an order" on orders
  for insert with check (true);
create policy "Admins can view orders" on orders
  for select using (auth.role() = 'authenticated');
create policy "Admins can update orders" on orders
  for update using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET for product images
-- Run this too, or create the bucket manually in Dashboard -> Storage
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images bucket"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Admins can update product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "Admins can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA (sample categories + one product so the site isn't empty)
-- Safe to delete from the admin panel later
-- ============================================================
insert into categories (name, slug) values
  ('Living Room', 'living-room'),
  ('Bedroom', 'bedroom'),
  ('Office', 'office'),
  ('Outdoor', 'outdoor'),
  ('Dining', 'dining');
