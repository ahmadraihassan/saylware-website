import { NextRequest, NextResponse } from "next/server";
import { createSession, isDeskAuthed } from "@/lib/desk/auth";
import { isAllowedOperator } from "@/lib/desk/credentials";
import { exchangeCode } from "@/lib/desk/gmail";
import { loadState, mutateState } from "@/lib/desk/store";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/desk/login", req.url));
  const authed = await isDeskAuthed();
  try {
    const current = await loadState();
    const tokens = await exchangeCode(code, req.nextUrl.origin, current.settings);
    if (!isAllowedOperator(tokens.email)) {
      return NextResponse.redirect(new URL("/desk/login?error=mailbox", req.url));
    }
    await mutateState((state) => {
      state.settings.google = tokens;
      if (tokens.email) state.settings.senderEmail = tokens.email;
    });
    if (!authed) await createSession();
  } catch {
    return NextResponse.redirect(new URL("/desk/setup?google=error", req.url));
  }
  return NextResponse.redirect(new URL(authed ? "/desk/setup" : "/desk", req.url));
}
