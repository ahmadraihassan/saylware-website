import { redirect } from "next/navigation";
import DeskShell from "@/components/desk/Shell";
import { isDeskAuthed } from "@/lib/desk/auth";
import { loadState } from "@/lib/desk/store";
import { remainingToday, stats } from "@/lib/desk/rules";

export const dynamic = "force-dynamic";

export default async function DeskAppLayout({ children }: { children: React.ReactNode }) {
  if (!(await isDeskAuthed())) redirect("/desk/login");
  const state = await loadState();
  const s = stats(state);
  return (
    <DeskShell remaining={remainingToday(state)} awaiting={s.awaiting}>
      {children}
    </DeskShell>
  );
}
