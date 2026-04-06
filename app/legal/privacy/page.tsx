import { Shell } from "@/components/shell";

export default function PrivacyPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-4xl px-6 pb-20 pt-4 lg:px-10">
        <section className="rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="mt-6 text-sm leading-8 text-black/72">
            This MVP stores booking, profile, and communication data necessary to deliver mobile massage services and satisfy
            Australian privacy obligations under the Privacy Act 1988 and APP principles.
          </p>
        </section>
      </main>
    </Shell>
  );
}
