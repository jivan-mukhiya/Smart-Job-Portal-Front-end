import { CheckCircle2 } from "lucide-react";

import type { JobSkill } from "@/types/job";

interface JobViewSkillsProps {
  skills: JobSkill[];
}

export function JobViewSkills({
  skills,
}: JobViewSkillsProps) {
  if (!skills?.length) {
    return null;
  }

  const sortedSkills = [...skills].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder,
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Required Skills
      </h2>

      <div className="flex flex-wrap gap-2">
        {sortedSkills.map((skill) => (
          <span
            key={skill.id}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium ${
              skill.required
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {skill.required && (
              <CheckCircle2 className="h-4 w-4" />
            )}

            <span>{skill.skillName}</span>

            {!skill.required && (
              <span className="text-xs opacity-70">
                Optional
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}