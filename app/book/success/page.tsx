import Link from "next/link";
import { Shell } from "@/components/shell";
import { getBookingById } from "@/lib/booking";
import { formatMoney } from "@/lib/format";

type SearchParams = Promise<{ bookingId?: string }>;

export default async function BookingSuccessPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const booking = searchParams.bookingId ? getBookingById(searchParams.bookingId) : null;

  return (
    <Shell>
      <main className="mx-auto max-w-4xl px-6 pb-20 pt-4 lg:px-10">
        <section className="rounded-[28px] bg-white/85 p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.24em] text-black/55">Booking success</p>
          <h1 className="mt-4 text-4xl font-semibold">The booking flow completed for the MVP demo.</h1>
          <p className="mt-4 text-sm leading-7 text-black/72">
            In production, this page should be reached only after Stripe webhook confirmation, then SMS and email notifications fire.
          </p>

          {booking ? (
            <div className="mt-8 rounded-[24px] bg-[#eef4ef] p-6 text-sm leading-7">
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Therapist:</strong> {booking.therapist?.name}
              </p>
              <p>
                <strong>Service:</strong> {booking.service?.name}
              </p>
              <p>
                <strong>Total:</strong> {formatMoney(booking.totalAmount)}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
              Book another session
            </Link>
            <Link href="/dashboard" className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold">
              View therapist dashboard
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
