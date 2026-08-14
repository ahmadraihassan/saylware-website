import { NextRequest, NextResponse } from "next/server";
import { nowIso, uid } from "@/lib/desk/ids";
import { messageByToken } from "@/lib/desk/rules";
import { mutateState } from "@/lib/desk/store";

async function unsub(token: string) {
  await mutateState((state) => {
    const message = messageByToken(state, "unsub", token);
    if (!message) return;
    const lead = state.leads.find((l) => l.id === message.leadId);
    if (!lead) return;
    lead.status = "unsubscribed";
    lead.updatedAt = nowIso();
    state.suppressions.unshift({
      id: uid("sup"),
      email: lead.email,
      domain: lead.domain,
      company: lead.company,
      reason: "Unsubscribed",
      createdAt: nowIso(),
    });
    for (const m of state.messages.filter((x) => x.leadId === lead.id && ["draft", "pending_approval", "approved", "scheduled"].includes(x.status))) {
      m.status = "cancelled";
    }
  });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  await unsub(token);
  return new NextResponse(
    `<!doctype html><html><body style="font-family:system-ui;background:#0e0f12;color:#f3f4f6;padding:48px">
      <p>You are off the list. We will not write again.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  await unsub(token);
  return new NextResponse("OK");
}
