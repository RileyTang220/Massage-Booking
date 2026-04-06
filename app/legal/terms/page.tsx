import { Shell } from "@/components/shell";

export default function TermsPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-4xl px-6 pb-20 pt-4 lg:px-10">
        <section className="rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-4xl font-semibold">Terms of Service</h1>
          <p className="mt-6 text-sm leading-8 text-black/72">
            Customers book independent therapists through the platform. Fees, cancellations, refunds, and support handling
            should be disclosed here before launch.
          </p>
        </section>
      </main>
    </Shell>
  );
}
