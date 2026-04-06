import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";
import { demoBookings } from "@/lib/demo-data";
import { formatMoney } from "@/lib/format";

export default function DashboardEarningsPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-3xl font-semibold">Earnings</h1>
          <div className="mt-6 space-y-4">
            {demoBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-[24px] border border-black/8 p-5 text-sm">
                <div>
                  <p className="font-semibold">{booking.id}</p>
                  <p className="mt-1 text-black/60">{booking.datetime}</p>
                </div>
                <div className="text-right">
                  <p>{formatMoney(booking.totalAmount - booking.platformFee)}</p>
                  <p className="mt-1 text-black/60">After platform fee</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
