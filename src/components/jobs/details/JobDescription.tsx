import { FileText } from "lucide-react";

export function JobDescription({
  description,
}: {
  description: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      <SectionTitle
        icon={<FileText size={19} />}
        title="Job Description"
      />

      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
        {description}
      </p>

    </section>
  );
}


function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-slate-950">

      {icon}

      <h2 className="text-lg font-bold">
        {title}
      </h2>

    </div>
  );
}