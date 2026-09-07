
"use client";

import {
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { useResume } from "@/hooks/useResume";
import { env } from "@/config/env";

function getResumeUrl(resume: any): string | null {
  const rawUrl =
    resume?.fileUrl ||
    resume?.resumeUrl ||
    resume?.filePath ||
    null;

  if (!rawUrl || typeof rawUrl !== "string") {
    return null;
  }

  const value = rawUrl.trim();

  if (!value) {
    return null;
  }

  // Already the complete backend URL
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // Backend returns:
  // /uploads/jobseeker/resume/file.pdf
  //
  // Actual API endpoint is:
  // /api/v1/files/uploads/jobseeker/resume/file.pdf
  if (value.startsWith("/uploads/")) {
    return `${env.apiUrl}/files${value}`;
  }

  // Backend returns:
  // uploads/jobseeker/resume/file.pdf
  if (value.startsWith("uploads/")) {
    return `${env.apiUrl}/files/${value}`;
  }

  // Backend already returns:
  // /api/v1/files/...
  if (value.startsWith("/api/v1/files/")) {
    return `http://localhost:9000${value}`;
  }

  // Backend returns only the filename
  return `${env.apiUrl}/files/uploads/jobseeker/resume/${encodeURIComponent(
    value
  )}`;
}

export function ResumeSection() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    resume,
    loading,
    uploading,
    error,
    updateResume,
  } = useResume();

  const resumeLink = getResumeUrl(resume);
  const hasResume = Boolean(resumeLink);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await updateResume(file);

    event.target.value = "";
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-600" />

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Resume
            </h3>

            <p className="text-xs text-slate-500">
              Upload your latest resume
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {hasResume ? "Replace" : "Upload"}
            </>
          )}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading resume...
        </div>
      ) : hasResume && resumeLink ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-white p-3">
          <div className="flex min-w-0 items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900">
                Resume uploaded
              </p>

              <p className="truncate text-xs text-slate-500">
                {resume?.fileName ||
                  resume?.originalFileName ||
                  "Resume file"}
              </p>
            </div>
          </div>

          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-semibold text-blue-600 hover:underline"
          >
            View
          </a>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center">
          <FileText className="mx-auto mb-2 h-6 w-6 text-slate-400" />

          <p className="text-sm font-medium text-slate-700">
            No resume uploaded
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload a PDF, DOC, or DOCX resume.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}