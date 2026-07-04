import { createClient } from "@/lib/supabase/server";
import { Order } from "@/lib/types";
import OrderStatusSelect from "@/components/OrderStatusSelect";

export const dynamic = "force-dynamic";

async function getOrders() {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Order[]) || [];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-sm shadow-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-medium">{order.customer_name}</p>
                <p className="text-sm text-charcoal-800/60">{order.customer_email}</p>
                <p className="text-sm text-charcoal-800/60">{order.customer_phone}</p>
                <p className="text-xs text-charcoal-800/40 mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">KES {Number(order.total).toLocaleString()}</p>
                <p className="text-xs uppercase text-charcoal-800/50">{order.payment_method}</p>
                <OrderStatusSelect orderId={order.id} currentStatus={order.order_status} />
              </div>
            </div>

            <div className="border-t border-wood-300/20 pt-3">
              <p className="text-xs uppercase tracking-wide text-charcoal-800/40 mb-2">Items</p>
              <ul className="text-sm space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-charcoal-800/60 mt-3">
                <span className="text-charcoal-800/40">Deliver to:</span> {order.shipping_address}
              </p>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-sm text-charcoal-800/50 py-12">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
