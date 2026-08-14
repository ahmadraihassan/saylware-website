import LeadsView from "@/components/desk/LeadsView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function LeadsPage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle kicker="Pipeline" title="Leads" hint="Named people only. Verify before a draft can enter the approve queue." />
      <LeadsView snap={snap} />
    </>
  );
}
