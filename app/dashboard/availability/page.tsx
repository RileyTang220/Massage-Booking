import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";
import { getAvailabilityForTherapist } from "@/lib/demo-data";

export default function DashboardAvailabilityPage() {
  const slots = getAvailabilityForTherapist("therapist-lena-hart");

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-3xl font-semibold">Availability</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {slots.map((slot, index) => (
              <div key={`${slot.dayOfWeek}-${index}`} className="rounded-[24px] bg-[#eef4ef] p-5 text-sm">
                <p className="font-semibold">Day {slot.dayOfWeek}</p>
                <p className="mt-2 text-black/60">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
