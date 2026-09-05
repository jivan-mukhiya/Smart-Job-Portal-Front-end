import { CompanyDetailsForm } from "@/components/company/profile/CompanyDetailsForm";

export default function CompanyProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-slate-500">
            Company Profile
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Company Details
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Add your company information so job seekers can
            learn more about your organization.
          </p>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <CompanyDetailsForm />

      </div>

    </main>
  );
}