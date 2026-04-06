import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";
import { demoBookings, getServiceById } from "@/lib/demo-data";
import { formatMoney } from "@/lib/format";

export default function DashboardBookingsPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-3xl font-semibold">Bookings</h1>
          <div className="mt-6 space-y-4">
            {demoBookings.map((booking) => {
              const service = getServiceById(booking.serviceId);
              return (
                <div key={booking.id} className="rounded-[24px] border border-black/8 p-5 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{booking.customerName}</p>
                      <p className="mt-1 text-black/60">{service?.name}</p>
                    </div>
                    <div className="text-right">
                      <p>{booking.status}</p>
                      <p className="mt-1 text-black/60">{formatMoney(booking.totalAmount)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Shell>
  );
}
