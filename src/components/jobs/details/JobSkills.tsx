import { Code2 } from "lucide-react";

export function JobSkills({
  skills,
}: {
  skills: string[];
}) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <Code2
          size={19}
          className="text-slate-700"
        />

        <h2 className="text-lg font-bold text-slate-950">
          Required Skills
        </h2>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}