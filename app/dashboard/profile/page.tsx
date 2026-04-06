import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Shell } from "@/components/shell";
import { getTherapistById } from "@/lib/demo-data";

export default function DashboardProfilePage() {
  const therapist = getTherapistById("therapist-lena-hart");

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-4 lg:px-10">
        <DashboardNav />
        <section className="mt-6 rounded-[28px] bg-white/85 p-8 shadow-card">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <div className="mt-6 rounded-[24px] bg-[#f5efe6] p-6 text-sm leading-7">
            <p>
              <strong>Name:</strong> {therapist?.name}
            </p>
            <p>
              <strong>Bio:</strong> {therapist?.bio}
            </p>
            <p>
              <strong>Skills:</strong> {therapist?.skills.join(", ")}
            </p>
            <p>
              <strong>Travel radius:</strong> {therapist?.travelRadiusKm} km
            </p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
