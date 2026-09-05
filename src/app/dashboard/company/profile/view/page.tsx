import { CompanyProfile } from "@/components/company/profile/view/CompanyProfile";

export default function CompanyProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">

          <p className="text-sm font-medium text-slate-500">
            Company
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Company Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage your company information.
          </p>

        </div>


        {/* =====================================================
            PROFILE
        ===================================================== */}

        <CompanyProfile />

      </div>

    </main>
  );
}