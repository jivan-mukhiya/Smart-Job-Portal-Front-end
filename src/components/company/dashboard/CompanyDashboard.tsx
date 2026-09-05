import { CompanyProfileCard } from "./CompanyProfileCard";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { HiringOverview } from "./HiringOverview";
import { QuickActions } from "./QuickActions";

export function CompanyDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <DashboardHeader />


        {/* =====================================================
            STATS
        ===================================================== */}

        <DashboardStats />


        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div className="mt-6">
          <QuickActions />
        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* =================================================
              COMPANY PROFILE
          ================================================= */}

          <div className="lg:col-span-1">
            <CompanyProfileCard />
          </div>


          {/* =================================================
              HIRING OVERVIEW
          ================================================= */}

          <div className="lg:col-span-2">
            <HiringOverview />
          </div>

        </div>

      </div>
    </main>
  );
}