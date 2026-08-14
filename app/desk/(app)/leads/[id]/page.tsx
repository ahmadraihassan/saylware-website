import LeadDetail from "@/components/desk/LeadDetail";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snap = await getDeskSnapshot();
  const lead = snap.leads.find((l) => l.id === id);
  return (
    <>
      <PageTitle kicker="Lead" title={lead?.company || "Lead"} />
      <LeadDetail snap={snap} leadId={id} />
    </>
  );
}
