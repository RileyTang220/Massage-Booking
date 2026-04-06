# MVP

This repository is a starter for an AI-driven mobile massage booking platform.

## Recommended architecture

- `Next.js` for the customer experience, therapist portal, and admin panel in one app.
- `PostgreSQL + Prisma` for bookings, therapist onboarding, payout records, and auditability.
- `Stripe Checkout + Stripe Connect` for customer payments, therapist onboarding, subscriptions, and split payouts.
- `Google Maps API` for matching based on travel distance and service radius.
- `Twilio` or similar for post-service follow-up SMS.

## Why this stack

The hard parts of this product are not UI screens. They are:

- marketplace payments and payout reconciliation
- therapist subscription gating
- time-slot conflict handling
- privacy and consent logging
- future AI orchestration against structured booking APIs

This stack handles those better than a no-code foundation.

## MVP scope included here

- Marketing landing page
- Functional customer booking demo flow: `/book` -> `/therapists/[id]` -> `/book/confirm` -> `/book/success`
- Therapist dashboard overview and sub-pages
- Admin operations page
- Legal pages required by the brief
- API route placeholders aligned to the brief for search, availability, bookings, admin actions, Stripe, and AI chat
- PostgreSQL schema for users, therapists, bookings, availability, and payouts

## Suggested build order

1. Add NextAuth.js v5 authentication and role-based access control.
2. Replace demo data with PostgreSQL queries via Prisma.
3. Implement therapist registration with Stripe Checkout and Connect onboarding.
4. Replace simulated booking confirmation with real Stripe Checkout + webhook persistence.
5. Add Google Maps Places autocomplete and travel-time ranking.
6. Add Twilio + Resend notifications.
7. Integrate Voiceflow or Dialogflow against the existing booking/matching endpoints.

## Australian compliance notes

- Publish a Privacy Policy and Terms of Service.
- Capture explicit consent for marketing and sensitive preferences.
- Store audit history for profile changes, payouts, and refund actions.
- Prepare breach response and deletion workflows.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Install dependencies with `npm install`.
3. Run `npx prisma generate`.
4. Run `npx prisma migrate dev`.
5. Start the app with `npm run dev`.
