import { Code2 } from "lucide-react";

import type {
  JobSeekerSkill,
} from "@/types/jobseeker";

interface SkillsSectionProps {
  skills: JobSeekerSkill[];
}

export function SkillsSection({
  skills,
}: SkillsSectionProps) {
  const activeSkills = skills
    .filter((skill) => skill.active)
    .sort(
      (a, b) =>
        a.displayOrder -
        b.displayOrder
    );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

          <Code2 size={18} />

        </div>

        <h2 className="text-lg font-bold text-slate-950">
          Skills
        </h2>

      </div>


      <div className="mt-6 flex flex-wrap gap-2">

        {activeSkills.length > 0 ? (
          activeSkills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
            >
              {skill.skillName}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No skills have been added yet.
          </p>
        )}

      </div>

    </section>
  );
}