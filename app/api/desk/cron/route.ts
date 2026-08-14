import { NextRequest, NextResponse } from "next/server";
import { runAutopilot } from "@/lib/desk/autopilot";
import { mutateState } from "@/lib/desk/store";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const ok = secret ? auth === `Bearer ${secret}` : process.env.NODE_ENV !== "production";
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const origin = req.nextUrl.origin;
  const result = await mutateState((state) => runAutopilot(state, origin));
  return NextResponse.json(result);
}
