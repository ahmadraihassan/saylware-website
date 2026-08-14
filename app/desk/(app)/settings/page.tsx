import SettingsView from "@/components/desk/SettingsView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function SettingsPage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle kicker="Controls" title="Settings" hint="Mailbox, meeting link, caps, and the never-contact list." />
      <SettingsView snap={snap} />
    </>
  );
}
