import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <CheckCircle size={48} className="mx-auto mb-6 text-wood-500" strokeWidth={1.5} />
      <h1 className="font-display text-4xl mb-4">Thank You!</h1>
      <p className="text-charcoal-800/70 mb-2">
        Your order has been placed successfully.
      </p>
      {searchParams.order && (
        <p className="text-sm text-charcoal-800/50 mb-8">
          Order reference: {searchParams.order.slice(0, 8).toUpperCase()}
        </p>
      )}
      <p className="text-charcoal-800/70 mb-8 max-w-md mx-auto">
        We&apos;ve sent a confirmation to your email. If you paid via M-Pesa,
        check your phone to complete payment if you haven&apos;t already.
      </p>
      <Link href="/shop" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}
