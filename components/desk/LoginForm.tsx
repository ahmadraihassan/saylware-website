"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/lib/desk/actions";
import { Field, inputClass, PrimaryButton } from "./ui";

function suggestSecret() {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[/+=]/g, "").slice(0, 24);
}

export default function LoginForm({
  passwordSet,
  googleApp,
}: {
  passwordSet: boolean;
  googleApp: boolean;
}) {
  const [state, action, pending] = useActionState(loginAction, undefined);
  const [secrets] = useState(() => ({
    password: suggestSecret(),
    session: suggestSecret() + suggestSecret().slice(0, 8),
    cron: suggestSecret(),
  }));
  const [copied, setCopied] = useState("");

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  }

  return (
    <div className="space-y-6">
      {!passwordSet ? (
        <div className="space-y-3 text-sm text-[var(--ink-soft)]">
          <p>Add these in Vercel → Project → Settings → Environment Variables (Production + Preview), then Redeploy.</p>
          <SecretRow name="DESK_PASSWORD" value={secrets.password} copied={copied} onCopy={copy} />
          <SecretRow name="DESK_SESSION_SECRET" value={secrets.session} copied={copied} onCopy={copy} />
          <SecretRow name="DESK_ALLOWED_EMAIL" value="awaisu@saylware.com" copied={copied} onCopy={copy} />
          <SecretRow name="DESK_PUBLIC_URL" value="https://saylware.com" copied={copied} onCopy={copy} />
          <SecretRow name="CRON_SECRET" value={secrets.cron} copied={copied} onCopy={copy} />
          <p>
            Then add <span className="font-mono text-[var(--ink)]">DATABASE_URL</span> from Neon (see Setup after you log in).
          </p>
        </div>
      ) : null}

      {googleApp ? (
        <a
          href="/api/desk/google/start?login=1"
          className="flex justify-center rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-semibold px-4 py-2.5"
        >
          Continue with Google (work mail)
        </a>
      ) : null}

      <form action={action} className="space-y-4">
        <Field label="Desk password">
          <input className={inputClass} type="password" name="password" autoComplete="current-password" required />
        </Field>
        {state?.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
        <PrimaryButton type="submit" disabled={pending || !passwordSet}>
          {pending ? "Checking…" : "Enter desk"}
        </PrimaryButton>
      </form>
    </div>
  );
}

function SecretRow({
  name,
  value,
  copied,
  onCopy,
}: {
  name: string;
  value: string;
  copied: string;
  onCopy: (name: string, value: string) => void;
}) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-[var(--ink)]">{name}</span>
        <button type="button" className="text-xs text-[var(--accent)]" onClick={() => onCopy(name, value)}>
          {copied === name ? "Copied" : "Copy value"}
        </button>
      </div>
      <p className="font-mono text-[11px] text-[var(--ink-muted)] break-all mt-1">{value}</p>
    </div>
  );
}
