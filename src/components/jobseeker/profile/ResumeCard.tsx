import {
  ExternalLink,
  FileText,
} from "lucide-react";

import type {
  JobSeekerResume,
} from "@/types/jobseeker";

interface ResumeCardProps {
  resume: JobSeekerResume | null;
}

export function ResumeCard({
  resume,
}: ResumeCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      <h2 className="text-sm font-bold text-slate-950">
        Resume
      </h2>


      {resume?.fileUrl ? (
        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">

              <FileText size={18} />

            </div>

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {resume.fileName ||
                  "My Resume"}
              </p>

              <p className="text-xs text-slate-500">
                {resume.fileSize ||
                  "PDF Document"}
              </p>

            </div>

          </div>


          <ExternalLink
            size={16}
            className="text-slate-400"
          />

        </a>
      ) : (
        <div className="mt-4 rounded-xl border border-slate-200 p-4">

          <p className="text-sm font-medium text-slate-700">
            No resume uploaded
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload your resume from your profile settings.
          </p>

        </div>
      )}

    </section>
  );
}