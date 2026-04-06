import { Shell } from "@/components/shell";
import { StatusPill } from "@/components/status-pill";
import { therapists } from "@/lib/demo-data";

const adminCards = [
  "Review therapist applications and documents",
  "Override bookings, refunds, and disputes",
  "See ad inventory placeholder and campaign slots",
  "Track SMS delivery and payout exceptions"
];

export default function AdminPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <section className="rounded-[28px] bg-white/80 p-8 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-black/55">Admin</p>
              <h1 className="mt-4 text-4xl font-semibold">Operational controls and compliance visibility.</h1>
            </div>
            <StatusPill>Internal Only</StatusPill>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {adminCards.map((item) => (
              <div key={item} className="rounded-[24px] bg-[#eef4ef] p-5 text-sm leading-7 text-black/72">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[24px] bg-[#f5efe6] p-6">
            <h2 className="text-xl font-semibold">Therapist review queue</h2>
            <div className="mt-4 space-y-3">
              {therapists.map((therapist) => (
                <div key={therapist.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold">{therapist.name}</p>
                    <p className="mt-1 text-black/60">{therapist.location}</p>
                  </div>
                  <StatusPill tone={therapist.isVerified ? "success" : "warning"}>
                    {therapist.isVerified ? "Verified" : "Pending"}
                  </StatusPill>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-[24px] bg-[#151718] p-6 text-sm leading-7 text-white/82">
            Australian privacy compliance should cover consent logging, data retention, access requests, breach response,
            and handling of health-related preference fields as sensitive information.
          </div>
        </section>
      </main>
    </Shell>
  );
}
