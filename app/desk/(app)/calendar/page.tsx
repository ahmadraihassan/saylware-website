import CalendarView from "@/components/desk/CalendarView";
import { PageTitle } from "@/components/desk/ui";
import { getDeskSnapshot } from "@/lib/desk/actions";

export default async function CalendarPage() {
  const snap = await getDeskSnapshot();
  return (
    <>
      <PageTitle kicker="Time" title="Calendar" hint="Log booked calls. A reminder is created an hour before each one." />
      <CalendarView snap={snap} />
    </>
  );
}
