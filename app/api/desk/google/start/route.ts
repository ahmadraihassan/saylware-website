import { NextRequest, NextResponse } from "next/server";
import { isDeskAuthed } from "@/lib/desk/auth";
import { googleAuthUrl, googleConfigured } from "@/lib/desk/gmail";
import { loadState } from "@/lib/desk/store";

export async function GET(req: NextRequest) {
  const login = req.nextUrl.searchParams.get("login") === "1";
  const state = await loadState();
  if (!login && !(await isDeskAuthed())) {
    return NextResponse.redirect(new URL("/desk/login", req.url));
  }
  if (!googleConfigured(state.settings)) {
    return NextResponse.redirect(new URL(login ? "/desk/login" : "/desk/setup", req.url));
  }
  return NextResponse.redirect(googleAuthUrl(req.nextUrl.origin, state.settings));
}
