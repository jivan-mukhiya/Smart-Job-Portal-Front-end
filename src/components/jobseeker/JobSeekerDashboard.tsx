
import { FeaturedJobsSection } from "./jobs/FeaturedJobsSection";
import { JobSearchSection } from "./jobs/JobSearchSection";
import { WhySection } from "./jobs/WhySection";

export default function JobSeekerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* AUTH-AWARE NAVBAR */}
      <JobSearchSection />

      <FeaturedJobsSection />

      <WhySection />

    </main>
  );
}
