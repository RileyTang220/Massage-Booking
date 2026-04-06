import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/shell";
import { formatMoney } from "@/lib/format";
import { getAvailabilityForTherapist, getServicesForTherapist, getTherapistById } from "@/lib/demo-data";

type SearchParams = Promise<{
  serviceType?: string;
  datetime?: string;
  address?: string;
  budget?: string;
}>;

export default async function TherapistProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const query = await searchParams;
  const therapist = getTherapistById(id);

  if (!therapist) {
    notFound();
  }

  const therapistServices = getServicesForTherapist(therapist.id);
  const slots = getAvailabilityForTherapist(therapist.id);

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[28px] bg-white/85 p-8 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#52614f] text-lg font-semibold text-white">
                {therapist.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{therapist.name}</h1>
                <p className="mt-1 text-sm text-black/60">
                  {therapist.location} · {therapist.rating.toFixed(1)} stars · {therapist.reviewCount} reviews
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-black/72">{therapist.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {therapist.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-[#eef4ef] px-3 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-semibold">Services</h2>
            <div className="mt-5 space-y-4">
              {therapistServices.map((service) => (
                <article key={service.id} className="rounded-3xl border border-black/8 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-black/70">{service.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold">{formatMoney(service.price)}</p>
                      <p className="mt-1 text-black/60">{service.durationMins} mins</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={{
                        pathname: "/book/confirm",
                        query: {
                          therapistId: therapist.id,
                          serviceId: service.id,
                          datetime: query.datetime || "2026-04-08T18:30",
                          address: query.address || "25 King William St, Adelaide SA",
                          customerName: "Demo Customer",
                          customerPhone: "+61400000000",
                          customerEmail: "demo@example.com"
                        }
                      }}
                      className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                    >
                      Choose this service
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] bg-[#151718] p-8 text-white shadow-card">
            <h2 className="text-2xl font-semibold">Weekly availability</h2>
            <div className="mt-6 space-y-4">
              {slots.map((slot, index) => (
                <div key={`${slot.therapistId}-${slot.dayOfWeek}-${index}`} className="rounded-3xl bg-white/10 p-4 text-sm">
                  <p>Day {slot.dayOfWeek}</p>
                  <p className="mt-1 text-white/72">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/72">
              In the full version, this panel becomes a live calendar filtered against existing bookings and timezone-aware slot logic.
            </p>
          </aside>
        </section>
      </main>
    </Shell>
  );
}
