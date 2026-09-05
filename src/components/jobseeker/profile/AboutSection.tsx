import { User } from "lucide-react";

interface AboutSectionProps {
  about: string;
}

export function AboutSection({
  about,
}: AboutSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <SectionHeader
        icon={<User size={18} />}
        title="About"
      />

      <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
        {about ||
          "No information about this job seeker has been added yet."}
      </p>

    </section>
  );
}


function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        {icon}
      </div>

      <h2 className="text-lg font-bold text-slate-950">
        {title}
      </h2>

    </div>
  );
}