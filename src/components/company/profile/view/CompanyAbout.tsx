import { FileText } from "lucide-react";

interface CompanyAboutProps {
  aboutUs?: string | null;
}

export function CompanyAbout({
  aboutUs,
}: CompanyAboutProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <FileText size={18} />
        </div>

        <h2 className="text-lg font-bold text-slate-950">
          About Company
        </h2>

      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
        {aboutUs ||
          "No information about this company has been added yet."}
      </p>

    </section>
  );
}