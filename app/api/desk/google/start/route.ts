import { NextRequest, NextResponse } from "next/server";
import { isDeskAuthed } from "@/lib/desk/auth";
import { googleAuthUrl, googleConfigured } from "@/lib/desk/gmail";

export async function GET(req: NextRequest) {
  if (!(await isDeskAuthed())) return NextResponse.redirect(new URL("/desk/login", req.url));
  if (!googleConfigured()) {
    return NextResponse.redirect(new URL("/desk/settings", req.url));
  }
  const origin = req.nextUrl.origin;
  return NextResponse.redirect(googleAuthUrl(origin));
}
