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

export function ResumeSection() {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const {
    resume,
    loading,
    uploading,
    error,
    updateResume,
  } = useResume();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await updateResume(file);

    event.target.value = "";
  };

  const resumeLink =
    resume?.resumeUrl ||
    resume?.fileUrl ||
    resume?.filePath ||
    null;

  const hasResume = Boolean(resumeLink);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
          <FileText
            size={18}
            className="text-slate-600"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Resume
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your current profile resume
              </p>
            </div>

            {hasResume && (
              <CheckCircle2
                size={18}
                className="shrink-0 text-emerald-500"
              />
            )}
          </div>

          {loading ? (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Loader2
                size={14}
                className="animate-spin"
              />
              Loading resume...
            </div>
          ) : hasResume ? (
            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {resume?.fileName ||
                      "Resume attached"}
                  </p>

                  {resume?.fileSize && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      {resume.fileSize}
                    </p>
                  )}
                </div>

                {resumeLink && (
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-red-500">
              {error ||
                "No resume found. Please add your resume before applying."}
            </p>
          )}

          <div className="mt-3">
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
              disabled={loading || uploading}
              leftIcon={
                uploading ? (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={14} />
                )
              }
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              {uploading
                ? "Uploading..."
                : hasResume
                  ? "Replace Resume"
                  : "Add Resume"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}