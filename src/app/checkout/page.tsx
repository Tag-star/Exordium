"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "stripe">("mpesa");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary">Browse the Collection</Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          subtotal,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (data.redirectUrl) {
        // Stripe checkout redirect
        window.location.href = data.redirectUrl;
        return;
      }

      // M-Pesa or fallback: order placed, clear cart and show confirmation
      clearCart();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl mb-10">Checkout</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field">Full Name</label>
            <input
              required
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input
              required
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="07XXXXXXXX"
              className="input-field"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Delivery Address</label>
            <textarea
              required
              rows={3}
              className="input-field"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div>
            <label className="label-field">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
                className={`border rounded-sm py-3 text-sm ${
                  paymentMethod === "mpesa"
                    ? "border-charcoal-900 bg-charcoal-900 text-cream-50"
                    : "border-wood-300/50"
                }`}
              >
                M-Pesa
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className={`border rounded-sm py-3 text-sm ${
                  paymentMethod === "stripe"
                    ? "border-charcoal-900 bg-charcoal-900 text-cream-50"
                    : "border-wood-300/50"
                }`}
              >
                Card
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        <div className="bg-cream-100 rounded-sm p-6 h-fit">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span className="text-charcoal-800/70">
                  {item.name} × {item.quantity}
                </span>
                <span>KES {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-wood-300/30 pt-3 flex justify-between font-medium">
            <span>Total</span>
            <span>KES {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
