import { NextRequest, NextResponse } from "next/server";
import { nowIso } from "@/lib/desk/ids";
import { messageByToken } from "@/lib/desk/rules";
import { mutateState } from "@/lib/desk/store";

function safeUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const dest = safeUrl(req.nextUrl.searchParams.get("to"));
  await mutateState((state) => {
    const message = messageByToken(state, "click", token);
    if (!message) return;
    if (!message.clickedAt) message.clickedAt = nowIso();
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (lead && ["sent", "opened"].includes(lead.status)) lead.status = "clicked";
  }).catch(() => undefined);
  return NextResponse.redirect(dest || "https://saylware.com");
}
