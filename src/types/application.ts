/* =========================================================
   APPLICATION STATUS
========================================================= */

export type ApplicationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEWED"
  | "SELECTED"
  | "REJECTED"
  | "WITHDRAWN";

/* =========================================================
   APPLY FOR JOB REQUEST
========================================================= */

export interface JobApplicationRequest {
  coverLetter?: string;
  expectedSalary?: number;
  noticePeriodDays?: number;
  candidateNotes?: string;
}

/* =========================================================
   GENERIC APPLICATION RESPONSE
========================================================= */

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data?: unknown;
  timestamp?: string;
}

/* =========================================================
   APPLICANT
========================================================= */

export interface ApplicationApplicant {
  jobSeekerId: number;
  userId: number;

  fullName: string;

  email: string;

  phone: string | null;

  professionalTitle: string | null;

  about: string | null;

  address: string | null;

  yearsOfExperience: number | null;

  highestEducation: string | null;

  openToWork: boolean;
}

/* =========================================================
   APPLICATION JOB
========================================================= */

export interface ApplicationJob {
  jobId: number;

  title: string;

  slug: string | null;

  location: string | null;

  jobType: string | null;

  jobLevel: string | null;

  salaryMin: number | null;

  salaryMax: number | null;

  salaryCurrency: string | null;

  companyName: string | null;

  companyId: number | null;
}

/* =========================================================
   APPLICATION RESUME
========================================================= */

export interface ApplicationResume {
  resumeId: number;

  fileName: string | null;

  fileUrl: string | null;

  fileType: string | null;

  fileSize: string | null;
}

/* =========================================================
   JOB APPLICATION
========================================================= */

export interface JobApplication {
  id: number;

  status: ApplicationStatus;

  coverLetter: string | null;

  expectedSalary: number | null;

  noticePeriodDays: number | null;

  candidateNotes: string | null;

  recruiterNotes: string | null;

  rejectionReason: string | null;

  appliedAt: string;

  reviewedAt: string | null;

  interviewAt: string | null;

  applicant: ApplicationApplicant;

  job: ApplicationJob;

  resume: ApplicationResume | null;
}

/* =========================================================
   PAGINATED APPLICATION RESPONSE
========================================================= */

export interface ApplicationPage {
  content: JobApplication[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;

  empty: boolean;
}

/* =========================================================
   APPLICATION HISTORY RESPONSE
========================================================= */

export interface ApplicationHistoryResponse {
  success: boolean;

  message: string;

  data: ApplicationPage;

  timestamp?: string;
}

/* =========================================================
   GET SINGLE APPLICATION RESPONSE
========================================================= */

export interface ApplicationDetailsResponse {
  success: boolean;

  message: string;

  data?: JobApplication;

  timestamp?: string;
}

/* =========================================================
   UPDATE APPLICATION STATUS REQUEST
========================================================= */

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
}

/* =========================================================
   UPDATE APPLICATION STATUS RESPONSE
========================================================= */

export interface UpdateApplicationStatusResponse {
  success: boolean;

  message: string;

  data?: JobApplication;

  timestamp?: string;
}