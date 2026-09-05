"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  toast,
} from "sonner";

import {
  applicationService,
} from "@/services/application.service";

import {
  useJobSeekerById,
} from "@/hooks/useJobSeekerById";

import type {
  ApplicationStatus,
  JobApplication,
} from "@/types/application";

import {
  ApplicationHeader,
} from "./ApplicationHeader";

import {
  ApplicantInformation,
} from "./ApplicantInformation";

import {
  ApplicationInformation,
} from "./ApplicationInformation";

import {
  ApplicationTimeline,
} from "./ApplicationTimeline";

import {
  CandidateNotes,
} from "./CandidateNotes";

import {
  CoverLetter,
} from "./CoverLetter";

import {
  JobInformation,
} from "./JobInformation";

import {
  RecruiterNotes,
} from "./RecruiterNotes";

import {
  RejectionReason,
} from "./RejectionReason";

import {
  ResumeCard,
} from "./ResumeCard";
import { ApplicationStatusPanel } from "./ApplicationStatus";

/* =========================================================
   COMPANY-CONTROLLED STATUS OPTIONS

   WITHDRAWN is intentionally excluded because it is
   controlled by the job seeker.
========================================================= */

const COMPANY_STATUS_OPTIONS: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "INTERVIEWED",
  "SELECTED",
  "REJECTED",
];

export default function ApplicationsDetails() {
  const params = useParams();
  const router = useRouter();

  const applicationId = Number(params.id);

  const [
    application,
    setApplication,
  ] = useState<JobApplication | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  const [
    applicantId,
    setApplicantId,
  ] = useState<number | null>(null);

  /* =========================================================
     LOAD FULL JOB SEEKER PROFILE
  ========================================================= */

  const {
    profile,
    loading: profileLoading,
  } = useJobSeekerById(applicantId);

  /* =========================================================
     LOAD APPLICATION
  ========================================================= */

  useEffect(() => {
    if (
      !Number.isInteger(applicationId) ||
      applicationId <= 0
    ) {
      setError(
        "Invalid application ID.",
      );

      setLoading(false);

      return;
    }

    let mounted = true;

    const loadApplication = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await applicationService.getCompanyApplicationById(
            applicationId,
          );

        if (!mounted) {
          return;
        }

        if (!response.success) {
          setError(
            response.message ||
              "Unable to load application.",
          );

          return;
        }

        if (!response.data) {
          setError(
            "Application was not found.",
          );

          return;
        }

        setApplication(
          response.data,
        );

        setApplicantId(
          response.data.applicant
            ?.jobSeekerId ?? null,
        );
      } catch (err: unknown) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load application.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadApplication();

    return () => {
      mounted = false;
    };
  }, [applicationId]);

  /* =========================================================
     UPDATE APPLICATION STATUS
  ========================================================= */

  const handleStatusChange = async (
    status: ApplicationStatus,
  ) => {
    if (!application) {
      return;
    }

    if (
      status === application.status
    ) {
      return;
    }

    if (
      status === "WITHDRAWN"
    ) {
      toast.error(
        "Withdrawn status can only be set by the job seeker.",
      );

      return;
    }

    try {
      setUpdatingStatus(true);

      const response =
        await applicationService.updateApplicationStatus(
          application.id,
          {
            status,
          },
        );

      if (!response.success) {
        toast.error(
          response.message ||
            "Unable to update application status.",
        );

        return;
      }

      if (response.data) {
        setApplication(
          response.data,
        );
      } else {
        setApplication(
          previous =>
            previous
              ? {
                  ...previous,
                  status,
                }
              : previous,
        );
      }

      toast.success(
        `Application status changed to ${formatStatus(
          status,
        )}.`,
      );
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to update application status.",
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="space-y-6">
        <BackButton
          onClick={() => router.back()}
        />

        <LoadingState />
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error ||
    !application
  ) {
    return (
      <div className="space-y-6">
        <BackButton
          onClick={() => router.back()}
        />

        <ErrorState
          message={
            error ??
            "Application not found."
          }
        />
      </div>
    );
  }

  /* =========================================================
     FULL PAGE
  ========================================================= */

  return (
    <div className="space-y-6">

      {/* =====================================================
          BACK
      ===================================================== */}

      <BackButton
        onClick={() => router.back()}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <ApplicationHeader
        application={application}
        profile={profile}
      />

      {/* =====================================================
          STATUS
      ===================================================== */}

      <ApplicationStatusPanel
        status={application.status}
        options={
          COMPANY_STATUS_OPTIONS
        }
        updating={
          updatingStatus
        }
        onChange={
          handleStatusChange
        }
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="space-y-6 lg:col-span-2">

          <ApplicantInformation
            applicant={
              application.applicant
            }
            profile={profile}
            loading={
              profileLoading
            }
          />

          <CoverLetter
            coverLetter={
              application.coverLetter
            }
          />

          <CandidateNotes
            notes={
              application.candidateNotes
            }
          />

          <RecruiterNotes
            notes={
              application.recruiterNotes
            }
          />

          <RejectionReason
            reason={
              application.rejectionReason
            }
          />

        </div>

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <div className="space-y-6">

          <ResumeCard
            applicationResume={
              application.resume
            }
            profileResume={
              profile?.resume ??
              null
            }
          />

          <ApplicationInformation
            application={
              application
            }
          />

          <JobInformation
            job={
              application.job
            }
          />

          <ApplicationTimeline
            application={
              application
            }
          />

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   BACK BUTTON
========================================================= */

function BackButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <ArrowLeft size={16} />

      Back to Applications
    </button>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

      <p className="mt-4 text-sm text-slate-500">
        Loading application...
      </p>

    </div>
  );
}

/* =========================================================
   ERROR STATE
========================================================= */

function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

      <h2 className="text-lg font-semibold text-red-900">
        Unable to load application
      </h2>

      <p className="mt-2 text-sm text-red-700">
        {message}
      </p>

    </div>
  );
}

/* =========================================================
   STATUS FORMATTER
========================================================= */

function formatStatus(
  value: string,
): string {
  return value
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}