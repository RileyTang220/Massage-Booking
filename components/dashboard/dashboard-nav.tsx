import Link from "next/link";
import type { Route } from "next";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/earnings", label: "Earnings" },
  { href: "/dashboard/availability", label: "Availability" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/subscription", label: "Subscription" }
] satisfies Array<{ href: Route; label: string }>;

export function DashboardNav() {
  return (
    <nav className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="rounded-full bg-white/80 px-4 py-2 text-sm shadow-card">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
