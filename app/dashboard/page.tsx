import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";
import { demoBookings } from "@/lib/demo-data";
import { formatMoney } from "@/lib/format";

const monthlyRevenue = demoBookings.reduce((total, booking) => total + booking.totalAmount - booking.platformFee, 0);

export default function DashboardOverviewPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.24em] text-black/55">Therapist dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold">Overview</h1>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] bg-[#f5efe6] p-5">
              <p className="text-sm text-black/60">Today bookings</p>
              <p className="mt-3 text-2xl font-semibold">2</p>
            </div>
            <div className="rounded-[24px] bg-[#eef4ef] p-5">
              <p className="text-sm text-black/60">This month earnings</p>
              <p className="mt-3 text-2xl font-semibold">{formatMoney(monthlyRevenue)}</p>
            </div>
            <div className="rounded-[24px] bg-[#fff5e8] p-5">
              <p className="text-sm text-black/60">Pending tasks</p>
              <p className="mt-3 text-2xl font-semibold">3</p>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
