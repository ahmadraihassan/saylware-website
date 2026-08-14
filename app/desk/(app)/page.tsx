import Dashboard from "@/components/desk/Dashboard";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function DeskHomePage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle kicker="Overview" title="Desk" hint="Approve every note. Fifty a day, max. One company, one thread." />
      <Dashboard snap={snap} />
    </>
  );
}
