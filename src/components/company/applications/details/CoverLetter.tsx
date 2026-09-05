import {
  FileText,
} from "lucide-react";

interface Props {
  coverLetter: string | null;
}

export function CoverLetter({
  coverLetter,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <Header />

      <div className="p-6">

        {coverLetter ? (
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {coverLetter}
          </p>
        ) : (
          <p className="text-sm text-slate-400">
            No cover letter provided.
          </p>
        )}

      </div>

    </section>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        <FileText
          size={18}
        />
      </div>

      <div>

        <h2 className="font-bold text-slate-950">
          Cover Letter
        </h2>

        <p className="text-xs text-slate-500">
          Candidate's application message
        </p>

      </div>

    </div>
  );
}