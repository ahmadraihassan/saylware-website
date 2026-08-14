import { NextRequest, NextResponse } from "next/server";
import { nowIso } from "@/lib/desk/ids";
import { mutateState } from "@/lib/desk/store";
import { messageByToken } from "@/lib/desk/rules";

const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  await mutateState((state) => {
    const message = messageByToken(state, "open", token);
    if (!message || message.openedAt) return;
    message.openedAt = nowIso();
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (lead && lead.status === "sent") lead.status = "opened";
  }).catch(() => undefined);
  return new NextResponse(GIF, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
