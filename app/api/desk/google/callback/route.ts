import { NextRequest, NextResponse } from "next/server";
import { isDeskAuthed } from "@/lib/desk/auth";
import { exchangeCode } from "@/lib/desk/gmail";
import { mutateState } from "@/lib/desk/store";

export async function GET(req: NextRequest) {
  if (!(await isDeskAuthed())) return NextResponse.redirect(new URL("/desk/login", req.url));
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/desk/settings", req.url));
  try {
    const tokens = await exchangeCode(code, req.nextUrl.origin);
    await mutateState((state) => {
      state.settings.google = tokens;
      if (tokens.email) state.settings.senderEmail = tokens.email;
    });
  } catch {
    return NextResponse.redirect(new URL("/desk/settings?google=error", req.url));
  }
  return NextResponse.redirect(new URL("/desk/settings", req.url));
}
