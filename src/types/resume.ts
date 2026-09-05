/* =========================================================
   RESUME
========================================================= */

export interface Resume {
  id: number | null;

  resumeUrl: string | null;

  filePath: string | null;

  fileName: string | null;

  fileSize: string | null;

  contentType: string | null;

  fileUrl: string | null;
}


/* =========================================================
   GET /job-seekers/me/resume
========================================================= */

export interface ResumeResponse {
  success: boolean;

  message: string;

  data: Resume;

  timestamp?: string;
}


/* =========================================================
   PUT /job-seekers/me/resume-url
========================================================= */

export interface UpdateResumeUrlResponse {
  success: boolean;

  message: string;

  data: Resume;

  timestamp?: string;
}