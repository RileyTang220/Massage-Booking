import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";

export default function DashboardSubscriptionPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-3xl font-semibold">Subscription</h1>
          <div className="mt-6 rounded-[24px] bg-[#eef4ef] p-6 text-sm leading-7">
            <p>
              <strong>Plan:</strong> Growth Therapist
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Next renewal:</strong> 2026-05-01
            </p>
            <p className="mt-4 text-black/60">
              Full implementation should sync this state from Stripe subscriptions and webhook events.
            </p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
