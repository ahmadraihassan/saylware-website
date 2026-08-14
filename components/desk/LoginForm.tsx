"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/desk/actions";
import { Field, inputClass, PrimaryButton } from "./ui";

export default function LoginForm({ passwordSet }: { passwordSet: boolean }) {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="space-y-4">
      {!passwordSet ? (
        <p className="text-sm text-red-300">
          Set <span className="font-mono">DESK_PASSWORD</span> in Vercel env vars, then reload. This desk stays off the public site until you do.
        </p>
      ) : null}
      <Field label="Password">
        <input className={inputClass} type="password" name="password" autoComplete="current-password" required />
      </Field>
      {state?.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      <PrimaryButton type="submit" disabled={pending || !passwordSet}>
        {pending ? "Checking…" : "Enter desk"}
      </PrimaryButton>
    </form>
  );
}
