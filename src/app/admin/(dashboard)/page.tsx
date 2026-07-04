import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, ShoppingCart, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createClient();

  const [{ count: productCount }, { count: orderCount }, { data: lowStock }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("products").select("id, name, stock").lte("stock", 3).eq("is_active", true),
    ]);

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    productCount: productCount || 0,
    orderCount: orderCount || 0,
    lowStock: lowStock || [],
    recentOrders: recentOrders || [],
  };
}

export default async function AdminDashboard() {
  const { productCount, orderCount, lowStock, recentOrders } = await getStats();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-sm p-6 shadow-card">
          <Package className="text-wood-500 mb-3" size={22} />
          <p className="text-2xl font-medium">{productCount}</p>
          <p className="text-sm text-charcoal-800/60">Total Products</p>
        </div>
        <div className="bg-white rounded-sm p-6 shadow-card">
          <ShoppingCart className="text-wood-500 mb-3" size={22} />
          <p className="text-2xl font-medium">{orderCount}</p>
          <p className="text-sm text-charcoal-800/60">Total Orders</p>
        </div>
        <div className="bg-white rounded-sm p-6 shadow-card">
          <AlertTriangle className="text-wood-500 mb-3" size={22} />
          <p className="text-2xl font-medium">{lowStock.length}</p>
          <p className="text-sm text-charcoal-800/60">Low Stock Items</p>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-wood-50 border border-wood-300/40 rounded-sm p-5 mb-10">
          <h3 className="text-sm font-medium mb-2">Low Stock Alert</h3>
          <ul className="text-sm text-charcoal-800/70 space-y-1">
            {lowStock.map((p) => (
              <li key={p.id}>
                {p.name} — {p.stock} left
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-sm shadow-card">
        <div className="flex items-center justify-between p-5 border-b border-wood-300/20">
          <h3 className="font-display text-lg">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-wood-600 hover:text-wood-700">
            View All →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-5 text-sm text-charcoal-800/50">No orders yet.</p>
        ) : (
          <div className="divide-y divide-wood-300/10">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-5 text-sm">
                <div>
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-charcoal-800/50 text-xs">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p>KES {Number(order.total).toLocaleString()}</p>
                  <span className="text-xs uppercase text-wood-600">{order.order_status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
