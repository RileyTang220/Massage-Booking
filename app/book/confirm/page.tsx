import { notFound } from "next/navigation";
import { ConfirmBookingButton } from "@/components/booking/confirm-booking-button";
import { Shell } from "@/components/shell";
import { createBookingPreview } from "@/lib/booking";
import { formatMoney } from "@/lib/format";

type SearchParams = Promise<{
  therapistId?: string;
  serviceId?: string;
  datetime?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  address?: string;
}>;

export default async function BookingConfirmPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  if (
    !searchParams.therapistId ||
    !searchParams.serviceId ||
    !searchParams.datetime ||
    !searchParams.customerName ||
    !searchParams.customerPhone ||
    !searchParams.address
  ) {
    notFound();
  }

  const preview = createBookingPreview({
    therapistId: searchParams.therapistId,
    serviceId: searchParams.serviceId,
    datetime: searchParams.datetime,
    customerName: searchParams.customerName,
    customerPhone: searchParams.customerPhone,
    customerEmail: searchParams.customerEmail,
    address: searchParams.address
  });

  if (!preview) {
    notFound();
  }

  return (
    <Shell>
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-4 lg:px-10">
        <section className="rounded-[28px] bg-white/85 p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.24em] text-black/55">Confirm booking</p>
          <h1 className="mt-4 text-4xl font-semibold">Review the service, time, and payout split.</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] bg-[#f5efe6] p-6">
              <p className="text-sm text-black/60">Therapist</p>
              <p className="mt-2 text-xl font-semibold">{preview.therapist.name}</p>
              <p className="mt-4 text-sm text-black/60">Service</p>
              <p className="mt-2 text-lg font-semibold">{preview.service.name}</p>
              <p className="mt-4 text-sm text-black/60">Appointment</p>
              <p className="mt-2 text-sm leading-7">{preview.datetime}</p>
              <p className="mt-4 text-sm text-black/60">Address</p>
              <p className="mt-2 text-sm leading-7">{preview.address}</p>
            </div>
            <div className="rounded-[24px] bg-[#eef4ef] p-6">
              <p className="text-sm text-black/60">Customer</p>
              <p className="mt-2 text-lg font-semibold">{preview.customerName}</p>
              <p className="mt-2 text-sm">{preview.customerPhone}</p>
              <p className="mt-2 text-sm">{preview.customerEmail || "No email provided"}</p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Total amount</span>
                  <span>{formatMoney(preview.totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform fee (15%)</span>
                  <span>{formatMoney(preview.platformFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Therapist payout</span>
                  <span>{formatMoney(preview.therapistAmount)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <ConfirmBookingButton
              payload={{
                therapistId: preview.therapist.id,
                serviceId: preview.service.id,
                datetime: preview.datetime,
                customerName: preview.customerName,
                customerPhone: preview.customerPhone,
                customerEmail: preview.customerEmail,
                address: preview.address
              }}
            />
          </div>
        </section>
      </main>
    </Shell>
  );
}
