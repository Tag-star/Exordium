# Exordium — Furniture E-Commerce Site

Built with Next.js 14, Tailwind CSS, and Supabase (database, auth, image storage).

## What's included

- **Storefront**: home page, shop/category listing, search, product detail pages, cart, checkout
- **Admin dashboard** at `/admin`: login, product management with drag-and-drop image upload, order management — no code or GitHub access needed to run the shop day-to-day
- **Payments**: M-Pesa and Stripe checkout are scaffolded with clear TODOs — orders are recorded either way, and payment gateways can be switched on when you have API keys

## 1. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the Supabase Dashboard, go to **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it. This creates all tables, security policies, the image storage bucket, and some starter categories.
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key

## 2. Create your admin login

Since there's no public signup (on purpose — you don't want random people creating admin accounts):

1. In Supabase Dashboard, go to **Authentication → Users → Add User**
2. Enter the email and password you want to log into `/admin` with
3. That's it — use those credentials at `yoursite.com/admin/login`

You can add more admin users the same way later (e.g. for an employee).

## 3. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the two Supabase values from Step 1. Leave Stripe/M-Pesa blank until you're ready to accept live payments — the site works and takes orders without them (orders are just recorded as "pending" for manual follow-up).

```
cp .env.local.example .env.local
```

## 4. Run locally

```
npm install
npm run dev
```

Visit `http://localhost:3000` for the storefront and `http://localhost:3000/admin/login` for the admin dashboard.

## 5. Deploy to Vercel

1. Push this project to a new GitHub repo
2. Import the repo in Vercel
3. In Vercel → Project → Settings → Environment Variables, add the same variables from your `.env.local`
4. Deploy

## Adding your first products

1. Log into `/admin`
2. Go to **Products → Add Product**
3. Fill in name, price, category, stock, description
4. Click **Create Product** — this saves the product first
5. You'll land on the Edit page — now drag and drop product photos into the image uploader
6. Click the star icon on any image to set it as the main/thumbnail photo

## Turning on real payments later

- **Stripe**: create a Stripe account, get your secret key from the Dashboard, add it as `STRIPE_SECRET_KEY`, then uncomment the Stripe Checkout Session code in `src/app/api/checkout/route.ts` (marked with TODO comments) and run `npm install stripe`.
- **M-Pesa (Daraja)**: register on the Safaricom Developer Portal, get your Consumer Key/Secret and Shortcode/Passkey, add them as env vars, then implement the STK Push call in the same file (marked with TODO comments).

Until then, both payment methods still create an order in the Orders tab — you can follow up with customers directly (e.g. send an M-Pesa till/paybill number by phone or email) while gateways are being set up.

## Notes

- Product slugs are auto-generated from the product name.
- Deleting a product also removes its images from storage.
- The homepage "Featured Pieces" section only shows products with the "Featured on homepage" checkbox enabled in the admin form.
- Currency is displayed in KES throughout — search the codebase for "KES" if you want to change this.
