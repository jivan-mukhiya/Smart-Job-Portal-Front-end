/* =========================================================
   JOB SEEKER PROFILE IMAGE
========================================================= */

export interface JobSeekerProfileImage {
  id: number | null;
  imagePath: string | null;
  fileName: string | null;
  fileSize: string | null;
  contentType: string | null;
  imageUrl: string | null;
}

/* =========================================================
   JOB SEEKER PROFILE IMAGE API RESPONSE
========================================================= */

export interface JobSeekerProfileImageResponse {
  success: boolean;
  message: string;
  data: string | null;
  timestamp?: string;
}

/* =========================================================
   JOB SEEKER RESUME
========================================================= */

export interface JobSeekerResume {
  id: number;
  resumeUrl: string | null;
  filePath: string | null;
  fileName: string | null;
  fileSize: string | null;
  contentType: string | null;
  fileUrl: string | null;
}

/* =========================================================
   JOB SEEKER SKILL
========================================================= */

export interface JobSeekerSkill {
  id: number;
  skillName: string;
  active: boolean;
  displayOrder: number;
}

/* =========================================================
   JOB SEEKER SOCIAL PROFILE
========================================================= */

export interface JobSeekerSocialProfile {
  id: number;
  platform: string;
  url: string;
  active: boolean;
}

/* =========================================================
   JOB SEEKER PROFILE
========================================================= */

export interface JobSeekerProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string | null;
  professionalTitle: string | null;
  about: string | null;
  address: string | null;
  yearsOfExperience: number | null;
  highestEducation: string | null;

  profileImage: JobSeekerProfileImage | null;

  resume: JobSeekerResume | null;

  openToWork: boolean;

  skills: JobSeekerSkill[];

  socialProfiles: JobSeekerSocialProfile[];

  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   JOB SEEKER PROFILE RESPONSE
========================================================= */

export interface JobSeekerProfileResponse {
  success: boolean;
  message: string;
  data: JobSeekerProfile;
  timestamp?: string;
}