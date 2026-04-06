import Link from "next/link";
import { rankTherapists } from "@/lib/matching";

export function SearchResults({
  serviceType,
  datetime,
  address,
  budget
}: {
  serviceType: string;
  datetime: string;
  address: string;
  budget?: number;
}) {
  const results = rankTherapists({ serviceType, datetime, address, budget });

  if (results.length === 0) {
    return (
      <div className="rounded-[28px] bg-white/80 p-6 shadow-card">
        <h2 className="text-2xl font-semibold">No therapists matched this request</h2>
        <p className="mt-3 text-sm leading-7 text-black/70">
          Increase the budget, relax the service type, or try a nearby suburb. This mirrors where the future AI assistant
          would ask a follow-up question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <article key={result.therapist.id} className="rounded-[28px] bg-white/85 p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#52614f] text-sm font-semibold text-white">
                  {result.therapist.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{result.therapist.name}</h3>
                  <p className="text-sm text-black/60">{result.therapist.location}</p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/72">{result.therapist.bio}</p>
            </div>
            <div className="rounded-2xl bg-[#f5efe6] px-4 py-3 text-right text-sm">
              <p>{result.therapist.rating.toFixed(1)} stars</p>
              <p className="mt-1 text-black/60">{result.therapist.reviewCount} reviews</p>
              <p className="mt-1 text-black/60">{result.distanceKm.toFixed(1)} km away</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-black/65">
            {result.matchedServiceNames.map((service) => (
              <span key={service} className="rounded-full bg-[#eef4ef] px-3 py-1">
                {service}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={{
                pathname: `/therapists/${result.therapist.id}`,
                query: { serviceType, datetime, address, budget: budget?.toString() || "" }
              }}
              className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              View profile and slots
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
