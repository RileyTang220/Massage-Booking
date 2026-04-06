import { SearchResults } from "@/components/booking/search-results";
import { Shell } from "@/components/shell";
import { StatusPill } from "@/components/status-pill";

type SearchParams = Promise<{
  serviceType?: string;
  datetime?: string;
  address?: string;
  budget?: string;
}>;

export default async function BookingPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const budget = searchParams.budget ? Number(searchParams.budget) * 100 : undefined;
  const hasSearch = Boolean(searchParams.serviceType && searchParams.datetime && searchParams.address);

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[28px] bg-white/85 p-8 shadow-card">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">Customer Booking Flow</h1>
              <StatusPill tone="warning">AI Intake Deferred</StatusPill>
            </div>
            <p className="mt-4 text-sm leading-7 text-black/72">
              For MVP, collect needs with a form and run deterministic matching. Later the AI chatbot can send the same
              structured payload to `/api/chat` and `/api/therapists/search`.
            </p>
            <form action="/book" className="mt-8 space-y-5 text-sm">
              <div className="rounded-3xl bg-[#f5efe6] p-5">
                <label className="font-semibold" htmlFor="serviceType">
                  Massage type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  defaultValue={searchParams.serviceType || "Relaxation"}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                >
                  <option>Relaxation</option>
                  <option>Prenatal</option>
                  <option>Sports</option>
                  <option>Deep Tissue</option>
                  <option>Remedial</option>
                </select>
              </div>
              <div className="rounded-3xl bg-[#eef4ef] p-5">
                <label className="font-semibold" htmlFor="datetime">
                  Preferred date and time
                </label>
                <input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  required
                  defaultValue={searchParams.datetime || "2026-04-08T18:30"}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                />
              </div>
              <div className="rounded-3xl bg-[#fff5e8] p-5">
                <label className="font-semibold" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  defaultValue={searchParams.address || "25 King William St, Adelaide SA"}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                />
                <label className="mt-4 block font-semibold" htmlFor="budget">
                  Budget (AUD)
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="80"
                  step="5"
                  defaultValue={searchParams.budget || "160"}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                />
              </div>
              <button type="submit" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">
                Find therapists
              </button>
            </form>
          </section>

          <section className="space-y-5">
            <div className="rounded-[28px] bg-[#151718] p-8 text-white shadow-card">
              <h2 className="text-2xl font-semibold">Suggested therapist results</h2>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Ranking uses simplified distance, service fit, rating, and review-count weighting aligned to the technical brief.
              </p>
            </div>
            {hasSearch ? (
              <SearchResults
                serviceType={searchParams.serviceType!}
                datetime={searchParams.datetime!}
                address={searchParams.address!}
                budget={budget}
              />
            ) : (
              <div className="rounded-[28px] bg-white/80 p-6 shadow-card">
                <p className="text-sm leading-7 text-black/72">
                  Fill in the request form to see the top 10 therapist matches. This is the same data shape the later AI flow
                  should produce.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </Shell>
  );
}
