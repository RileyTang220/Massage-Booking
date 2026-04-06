import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-Driven Mobile Massage Booking",
  description: "Mobile massage booking platform with therapist matching, Stripe payments, and therapist operations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
