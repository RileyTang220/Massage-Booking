import Link from "next/link";
import { SectionCard } from "@/components/section-card";
import { Shell } from "@/components/shell";
import { launchPhases, productPrinciples, therapistFeatures } from "@/lib/constants";

export default function HomePage() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-black/5 bg-[#fffaf4]/90 p-8 shadow-card lg:p-12">
            <p className="text-sm uppercase tracking-[0.24em] text-black/55">AI-assisted mobile wellness marketplace</p>
            <h1 className="mt-4 max-w-3xl text-5xl leading-tight lg:text-7xl">
              Book vetted massage therapists at home with a backend built for scale.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/72">
              This MVP keeps the AI chatbot decoupled for later integration, while shipping the harder pieces first:
              therapist onboarding, booking, payments, availability, payouts, and admin control.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Start Booking Flow
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold"
              >
                View Therapist Portal
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] bg-[#52614f] p-8 text-white shadow-card">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">Recommended stack</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/88">
              <li>Next.js App Router for customer app, therapist portal, and admin in one codebase.</li>
              <li>PostgreSQL + Prisma for bookings, therapists, payouts, subscriptions, and audit history.</li>
              <li>Stripe Checkout + Stripe Connect for customer payments and therapist split payouts.</li>
              <li>Twilio or MessageMedia for follow-up SMS in Australia.</li>
              <li>Google Maps Distance Matrix or Routes API for therapist matching by travel time.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {productPrinciples.map((item) => (
            <SectionCard key={item} title={item} description="Chosen to reduce early platform risk and avoid a rewrite after launch." />
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-white/80 p-8 shadow-card">
            <h2 className="text-3xl font-semibold">Why this stack is better than no-code here</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-black/72">
              <p>Marketplace payout logic, therapist subscriptions, and schedule conflict prevention are backend-heavy.</p>
              <p>Privacy compliance in Australia is easier when data model, audit trail, and consent logic live in your own app.</p>
              <p>Keeping AI intake separate means you can start with forms and rules today, then plug in Voiceflow/Dialogflow later.</p>
            </div>
          </div>
          <div className="rounded-[32px] bg-[#f2eadf] p-8 shadow-card">
            <h2 className="text-3xl font-semibold">Therapist-side MVP</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-black/72">
              {therapistFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-[32px] bg-white/80 p-8 shadow-card">
          <h2 className="text-3xl font-semibold">Delivery roadmap</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {launchPhases.map((phase) => (
              <SectionCard key={phase.title} title={phase.title} description={phase.description} className="bg-[#fcf8f3]" />
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
