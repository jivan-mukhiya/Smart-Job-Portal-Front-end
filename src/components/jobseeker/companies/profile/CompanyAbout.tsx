interface CompanyAboutProps {
  aboutUs?: string | null;
}

export function CompanyAbout({
  aboutUs,
}: CompanyAboutProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-bold text-slate-950">
        About Company
      </h2>

      <div className="mt-4 h-px bg-slate-100" />

      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
        {aboutUs || "No company description available."}
      </p>
    </section>
  );
}