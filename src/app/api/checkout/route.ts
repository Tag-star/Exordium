import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, paymentMethod } = body;

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return NextResponse.json({ error: "Missing required customer details." }, { status: 400 });
    }
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const supabase = createClient();

    // Create the order record first (status: pending)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        shipping_address: customer.address,
        items,
        subtotal,
        total: subtotal, // TODO: add shipping cost logic here if needed
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);
      return NextResponse.json({ error: "Could not create order." }, { status: 500 });
    }

    if (paymentMethod === "stripe") {
      // TODO: Wire up real Stripe Checkout Session once STRIPE_SECRET_KEY is set.
      // Example:
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const session = await stripe.checkout.sessions.create({
      //   mode: "payment",
      //   line_items: items.map((i) => ({
      //     price_data: {
      //       currency: "kes",
      //       product_data: { name: i.name },
      //       unit_amount: Math.round(i.price * 100),
      //     },
      //     quantity: i.quantity,
      //   })),
      //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${order.id}`,
      //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      //   metadata: { order_id: order.id },
      // });
      // return NextResponse.json({ redirectUrl: session.url });

      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { error: "Card payments aren't set up yet. Please choose M-Pesa or contact us directly." },
          { status: 400 }
        );
      }
    }

    if (paymentMethod === "mpesa") {
      // TODO: Wire up real Daraja STK Push once MPESA_* env vars are set.
      // const stkResponse = await initiateStkPush(customer.phone, subtotal, order.id);
      if (!process.env.MPESA_CONSUMER_KEY) {
        // Demo mode: order is recorded as pending, store owner follows up manually.
        return NextResponse.json({ orderId: order.id });
      }
    }

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
