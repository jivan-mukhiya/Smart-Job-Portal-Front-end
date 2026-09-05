import {
  BriefcaseBusiness,
} from "lucide-react";

interface ExperienceSectionProps {
  yearsOfExperience: number;
}

export function ExperienceSection({
  yearsOfExperience,
}: ExperienceSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <SectionHeader />

      <div className="mt-6 rounded-xl border border-slate-200 p-5">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="font-semibold text-slate-950">
              Professional Experience
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {yearsOfExperience}{" "}
              {yearsOfExperience === 1
                ? "year"
                : "years"}{" "}
              of experience
            </p>

          </div>


          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">

            {yearsOfExperience}{" "}
            {yearsOfExperience === 1
              ? "Year"
              : "Years"}

          </span>

        </div>

      </div>

    </section>
  );
}


function SectionHeader() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

        <BriefcaseBusiness size={18} />

      </div>

      <h2 className="text-lg font-bold text-slate-950">
        Experience
      </h2>

    </div>
  );
}