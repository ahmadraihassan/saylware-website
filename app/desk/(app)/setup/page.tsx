import SetupView from "@/components/desk/SetupView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function SetupPage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle
        kicker="First run"
        title="Setup"
        hint="Connect the database, your work mailbox, and Hunter. After that, you mostly approve."
      />
      <SetupView snap={snap} />
    </>
  );
}
