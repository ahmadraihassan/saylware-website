import FollowupsView from "@/components/desk/FollowupsView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function FollowupsPage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle kicker="Cadence" title="Follow-ups" hint="Day 3 and day 7 after a first note. Skip anyone who replied or unsubscribed." />
      <FollowupsView snap={snap} />
    </>
  );
}
