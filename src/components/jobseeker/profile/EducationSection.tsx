import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  highestEducation: string;
}

export function EducationSection({
  highestEducation,
}: EducationSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

          <GraduationCap size={18} />

        </div>

        <h2 className="text-lg font-bold text-slate-950">
          Education
        </h2>

      </div>


      <div className="mt-6 rounded-xl border border-slate-200 p-5">

        <p className="text-xs font-medium text-slate-400">
          Highest Education
        </p>

        <h3 className="mt-1 font-semibold text-slate-950">

          {highestEducation ||
            "Education information not provided"}

        </h3>

      </div>

    </section>
  );
}