import QueueView from "@/components/desk/QueueView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function QueuePage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle
        kicker="Human check"
        title="Approve"
        hint="Read each note as if you were the person receiving it. Approve schedules it into the send window with a gap between messages."
      />
      <QueueView snap={snap} />
    </>
  );
}
