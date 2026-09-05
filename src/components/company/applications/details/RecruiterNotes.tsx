import {
  Users,
} from "lucide-react";

interface Props {
  notes: string | null;
}

export function RecruiterNotes({
  notes,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Users size={18} />
        </div>

        <div>

          <h2 className="font-bold text-slate-950">
            Recruiter Notes
          </h2>

          <p className="text-xs text-slate-500">
            Internal recruitment notes
          </p>

        </div>

      </div>

      <div className="p-6">

        {notes ? (
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {notes}
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            No recruiter notes available.
          </p>
        )}

      </div>

    </section>
  );
}