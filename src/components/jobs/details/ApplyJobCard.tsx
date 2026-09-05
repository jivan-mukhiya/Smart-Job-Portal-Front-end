"use client";

import {
  ArrowRight,
  Loader2,
  Send,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api-error";
import { applicationService } from "@/services/application.service";
import { useAuth } from "@/context/AuthContext";

import { ResumeSection } from "../utils/ResumeSection";
import { ApplyJobForm } from "../utils/ApplyJobForm";

interface ApplyJobCardProps {
  jobId: number;
  status: string;
}

export function ApplyJobCard({
  jobId,
  status,
}: ApplyJobCardProps) {

  const router = useRouter();

  const {
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [coverLetter, setCoverLetter] =
    useState("");

  const [expectedSalary, setExpectedSalary] =
    useState("");

  const [noticePeriodDays, setNoticePeriodDays] =
    useState("");

  const [candidateNotes, setCandidateNotes] =
    useState("");


  /* =========================================================
     JOB STATUS
  ========================================================= */

  const normalizedStatus =
    status?.toUpperCase() ?? "";

  const isOpen =
    normalizedStatus === "ACTIVE" ||
    normalizedStatus === "OPEN" ||
    normalizedStatus === "PUBLISHED";


  /* =========================================================
     APPLY NOW
  ========================================================= */

  const handleApplyNow = () => {

    // Wait until AuthProvider has checked localStorage.
    if (authLoading) {
      return;
    }

    // User is not logged in.
    if (!isAuthenticated) {
      router.push(
        `${"/auth/login"}?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`,
      );

      return;
    }

    // User is logged in.
    setOpen(true);
  };


  /* =========================================================
     SUBMIT APPLICATION
  ========================================================= */

  const handleSubmit = async () => {

    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push(
        `${"/auth/login"}?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`,
      );

      return;
    }

    try {

      setSubmitting(true);

      const response =
        await applicationService.applyForJob(
          jobId,
          {
            coverLetter:
              coverLetter.trim() ||
              undefined,

            expectedSalary:
              expectedSalary.trim() !== ""
                ? Number(expectedSalary)
                : undefined,

            noticePeriodDays:
              noticePeriodDays.trim() !== ""
                ? Number(noticePeriodDays)
                : undefined,

            candidateNotes:
              candidateNotes.trim() ||
              undefined,
          },
        );


      if (!response.success) {

        toast.error(
          response.message ||
            "Unable to submit application.",
        );

        return;
      }


      toast.success(
        response.message ||
          "Application submitted successfully.",
      );


      setOpen(false);

      setCoverLetter("");
      setExpectedSalary("");
      setNoticePeriodDays("");
      setCandidateNotes("");

    } catch (error: unknown) {

      let message =
        "Unable to submit application.";


      if (error instanceof ApiError) {

        message =
          error.message;

      } else if (
        error instanceof Error
      ) {

        message =
          error.message;
      }


      toast.error(message);

    } finally {

      setSubmitting(false);
    }
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      <h3 className="font-bold text-slate-950">
        Interested in this job?
      </h3>


      <p className="mt-2 text-sm leading-6 text-slate-500">
        Submit your application and take the next step
        toward your career.
      </p>


      {!open ? (

        <Button
          type="button"
          size="lg"
          fullWidth
          disabled={
            !isOpen ||
            authLoading
          }
          leftIcon={
            authLoading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Send size={17} />
            )
          }
          rightIcon={
            !authLoading ? (
              <ArrowRight size={16} />
            ) : undefined
          }
          className="mt-5"
          onClick={handleApplyNow}
        >
          {authLoading
            ? "Checking..."
            : isOpen
              ? "Apply Now"
              : "Job Closed"}
        </Button>

      ) : (

        <div className="mt-5 space-y-5">

          {/* =================================================
              CURRENT RESUME
          ================================================= */}

          <ResumeSection />


          {/* =================================================
              APPLICATION FORM
          ================================================= */}

          <ApplyJobForm
            coverLetter={coverLetter}
            expectedSalary={expectedSalary}
            noticePeriodDays={noticePeriodDays}
            candidateNotes={candidateNotes}
            submitting={submitting}

            onCoverLetterChange={
              setCoverLetter
            }

            onExpectedSalaryChange={
              setExpectedSalary
            }

            onNoticePeriodDaysChange={
              setNoticePeriodDays
            }

            onCandidateNotesChange={
              setCandidateNotes
            }

            onCancel={() =>
              setOpen(false)
            }

            onSubmit={
              handleSubmit
            }
          />


          {submitting && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">

              <Loader2
                size={14}
                className="animate-spin"
              />

              Submitting application...

            </div>
          )}

        </div>
      )}


      <p className="mt-3 text-center text-xs text-slate-400">
        Your profile will be shared with the company.
      </p>

    </section>
  );
}