import JobsView from "@/components/desk/JobsView";
import { PageTitle } from "@/components/desk/ui";

export default function JobsPage() {
  return (
    <>
      <PageTitle
        kicker="Hiring signals"
        title="When they are hiring"
        hint="Paste a job you found. Use it as the reason to write. We do not scrape Indeed or any job board for emails."
      />
      <JobsView />
    </>
  );
}
