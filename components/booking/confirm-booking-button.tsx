"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ConfirmBookingButton({
  payload
}: {
  payload: {
    therapistId: string;
    serviceId: string;
    datetime: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    address: string;
  };
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking request failed");
      }

      router.push(`/book/success?bookingId=${data.booking.id}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unknown booking error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={submitting}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating booking..." : "Confirm booking and continue"}
      </button>
      <p className="text-xs leading-6 text-black/58">
        MVP behavior: this creates a booking record response and simulates the post-checkout success path.
      </p>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
