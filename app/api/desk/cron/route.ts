import { NextRequest, NextResponse } from "next/server";
import { detectReplies, markMeetingReminders, processDueSends } from "@/lib/desk/process";
import { mutateState } from "@/lib/desk/store";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const ok = secret ? auth === `Bearer ${secret}` : process.env.NODE_ENV !== "production";
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const origin = req.nextUrl.origin;
  const result = await mutateState(async (state) => {
    markMeetingReminders(state);
    const sent = await processDueSends(state, origin);
    const replies = await detectReplies(state).catch(() => 0);
    return { ...sent, replies };
  });
  return NextResponse.json(result);
}
