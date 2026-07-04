"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-56 md:min-h-screen bg-charcoal-900 text-cream-100 flex md:flex-col">
      <div className="p-6 hidden md:block">
        <h2 className="font-display text-xl">Exordium</h2>
        <p className="text-xs text-cream-100/40 uppercase tracking-wide">Admin</p>
      </div>

      <nav className="flex md:flex-col flex-1 md:p-4 md:gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-sm transition-colors flex-1 md:flex-none justify-center md:justify-start ${
                active
                  ? "bg-wood-500 text-cream-50"
                  : "text-cream-100/70 hover:bg-cream-100/10"
              }`}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm text-cream-100/70 hover:bg-cream-100/10 md:m-4 rounded-sm"
      >
        <LogOut size={18} />
        <span className="hidden md:inline">Log Out</span>
      </button>
    </aside>
  );
}
