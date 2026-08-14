import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/desk/LoginForm";
import { isDeskAuthed, deskPasswordConfigured } from "@/lib/desk/auth";

export const metadata: Metadata = {
  title: "Desk login",
  robots: { index: false, follow: false },
};

export default async function DeskLoginPage() {
  if (await isDeskAuthed()) redirect("/desk");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md soft-shell p-8">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Private</p>
        <h1 className="font-display text-3xl font-bold mb-2">Saylware Desk</h1>
        <p className="text-sm text-[var(--ink-soft)] mb-6">
          Outreach, approvals, and follow-ups. Not linked from the public site.
        </p>
        <LoginForm passwordSet={deskPasswordConfigured()} />
      </div>
    </div>
  );
}
