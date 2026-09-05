import { CheckCircle2 } from "lucide-react";

export function JobSpecifications({
  specifications,
}: {
  specifications: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-slate-950">
        Requirements
      </h2>

      <div className="mt-5 flex items-start gap-3">
        <CheckCircle2
          size={18}
          className="mt-1 shrink-0 text-slate-500"
        />

        <p className="text-sm leading-7 text-slate-600">
          {specifications}
        </p>
      </div>
    </section>
  );
}