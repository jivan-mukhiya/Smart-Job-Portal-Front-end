import {
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

import type {
  ApplicationResume,
} from "@/types/application";

import type {
  JobSeekerResume,
} from "@/types/jobseeker";

interface Props {
  applicationResume:
    | ApplicationResume
    | null;

  profileResume:
    | JobSeekerResume
    | null;
}

export function ResumeCard({
  applicationResume,
  profileResume,
}: Props) {
  const fileUrl =
    profileResume?.fileUrl ??
    applicationResume?.fileUrl ??
    null;

  const fileName =
    profileResume?.fileName ??
    applicationResume?.fileName ??
    "Resume";

  const fileSize =
    profileResume?.fileSize ??
    applicationResume?.fileSize ??
    "Size unavailable";

  const fileType =
    profileResume?.contentType ??
    applicationResume?.fileType ??
    "Unknown file type";

  const resumeExists =
    Boolean(
      applicationResume ||
        profileResume,
    );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <Header />

      <div className="p-6">

        {!resumeExists ? (
          <EmptyResume />
        ) : (
          <>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
                  <FileText
                    size={19}
                  />
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-slate-900">
                    {fileName}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {fileSize}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-slate-400">
                    {fileType}
                  </p>

                </div>

              </div>

            </div>

            {fileUrl ? (
              <div className="mt-4 grid grid-cols-2 gap-2">

                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  <ExternalLink
                    size={14}
                  />

                  View
                </a>

                <a
                  href={fileUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Download
                    size={14}
                  />

                  Download
                </a>

              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">

                <p className="text-xs leading-5 text-amber-800">
                  Resume information is available,
                  but the resume file URL was not
                  returned by the API.
                </p>

              </div>
            )}
          </>
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
        <FileText size={18} />
      </div>

      <div>

        <h2 className="font-bold text-slate-950">
          Resume
        </h2>

        <p className="text-xs text-slate-500">
          Candidate resume
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyResume() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">

      <FileText
        size={28}
        className="mx-auto text-slate-400"
      />

      <p className="mt-3 text-sm font-medium text-slate-700">
        No resume
      </p>

      <p className="mt-1 text-xs text-slate-400">
        The candidate has not provided a resume.
      </p>

    </div>
  );
}