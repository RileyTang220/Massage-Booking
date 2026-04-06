import Link from "next/link";
import { appName } from "@/lib/constants";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          {appName}
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/book">Book</Link>
          <Link href="/dashboard">Therapists</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
