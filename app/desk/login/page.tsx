import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/desk/LoginForm";
import { isDeskAuthed, deskPasswordConfigured } from "@/lib/desk/auth";
import { googleConfigured } from "@/lib/desk/gmail";
import { loadState } from "@/lib/desk/store";

export const metadata: Metadata = {
  title: "Desk login",
  robots: { index: false, follow: false },
};

export default async function DeskLoginPage() {
  if (await isDeskAuthed()) redirect("/desk");
  const state = await loadState().catch(() => null);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg soft-shell p-8">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] mb-3">Private</p>
        <h1 className="font-display text-3xl font-bold mb-2">Saylware Desk</h1>
        <p className="text-sm text-[var(--ink-soft)] mb-6">
          You approve. The desk drafts, verifies, and watches the inbox.
        </p>
        <LoginForm passwordSet={deskPasswordConfigured()} googleApp={googleConfigured(state?.settings)} />
      </div>
    </div>
  );
}
