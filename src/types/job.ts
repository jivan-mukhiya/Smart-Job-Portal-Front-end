  // src/types/job.ts

  // ============================================================
  // JOB SKILL RESPONSE
  // ============================================================

  export interface JobSkill {
    id: number;
    skillName: string;
    required: boolean;
    displayOrder: number;
  }

  // ============================================================
  // JOB BENEFIT RESPONSE
  // ============================================================

  export interface JobBenefit {
    id: number;
    benefitName: string;
    description: string | null;
    displayOrder: number;
  }

  // ============================================================
  // JOB ATTACHMENT RESPONSE
  // ============================================================

  export interface JobAttachment {
    id?: number;
    fileName?: string | null;
    fileUrl?: string | null;
    fileSize?: string | null;
    contentType?: string | null;
  }

  // ============================================================
  // JOB REQUEST
  //
  // Matches backend:
  // com.texas.smart.job.portal.modules.job.dto.request.JobRequest
  // ============================================================

  export interface JobRequest {
    title: string;

    description?: string | null;

    responsibilities?: string | null;

    requirements?: string | null;

    location?: string | null;

    address?: string | null;

    salaryMin?: number | null;

    salaryMax?: number | null;

    salaryCurrency?: string;

    salaryNegotiable?: boolean;

    jobType?: string | null;

    jobLevel?: string | null;

    experienceRequired?: number | null;

    educationRequired?: string | null;

    vacancies: number;

    applicationDeadline?: string | null;

    featured?: boolean;

    urgent?: boolean;

    requiredSkills?: JobSkillRequest[];

    benefits?: JobBenefitRequest[];
  }

  // ============================================================
  // JOB SKILL REQUEST
  //
  // Matches backend JobSkillRequest
  // ============================================================

  export interface JobSkillRequest {
    skillName: string;

    required?: boolean;

    displayOrder?: number;
  }

  // ============================================================
  // JOB BENEFIT REQUEST
  //
  // Assumed backend DTO:
  //
  // JobBenefitRequest {
  //     String benefitName;
  //     String description;
  //     Integer displayOrder;
  // }
  //
  // Your message contained JobSkillRequest twice.
  // ============================================================

  export interface JobBenefitRequest {
    benefitName: string;

    description?: string | null;

    displayOrder?: number;
  }

  // ============================================================
  // JOB RESPONSE
  // ============================================================

  export interface Job {
    id: number;

    title: string | null;

    slug: string | null;

    description: string | null;

    responsibilities: string | null;

    requirements: string | null;

    location: string | null;

    address: string | null;

    companyId: number;

    companyName: string | null;

    companyLogo: string | null;

    salaryMin: number | null;

    salaryMax: number | null;

    salaryCurrency: string | null;

    salaryNegotiable: boolean;

    salaryRange: string | null;

    jobType: string | null;

    jobLevel: string | null;

    experienceRequired: number | null;

    educationRequired: string | null;

    vacancies: number;

    applicationDeadline: string | null;

    postedDate: string | null;

    lastUpdatedDate: string | null;

    status: string | null;

    active: boolean;

    featured: boolean;

    urgent: boolean;

    viewCount: number;

    applicationCount: number;

    expired: boolean;

    published: boolean;

    requiredSkills: JobSkill[];

    benefits: JobBenefit[];

    attachments?: JobAttachment[];
  }

  // ============================================================
  // SINGLE JOB RESPONSE
  // ============================================================

  export interface JobResponse {
    success: boolean;

    message: string;

    data: Job | null;

    timestamp?: string;
  }

  // ============================================================
  // PAGINATED JOB DATA
  // ============================================================

  export interface JobsPageData {
    content: Job[];

    page: number;

    size: number;

    totalElements: number;

    totalPages: number;

    first: boolean;

    last: boolean;

    empty: boolean;
  }

  // ============================================================
  // PUBLISHED JOBS RESPONSE
  // ============================================================

  export interface PublishedJobsResponse {
    success: boolean;

    message: string;

    data: JobsPageData;

    timestamp?: string;
  }

  // ============================================================
  // MY JOBS RESPONSE
  //
  // GET /jobs/me?page=0&size=20
  // ============================================================

  export interface MyJobsResponse {
    success: boolean;

    message: string;

    data: JobsPageData;

    timestamp?: string;
  }

  // ============================================================
  // GENERIC JOB MUTATION RESPONSE
  //
  // POST /jobs
  // PUT /jobs/{id}
  // DELETE /jobs/{id}
  // PATCH /jobs/{id}/publish
  // PATCH /jobs/{id}/close
  // PATCH /jobs/{id}/status
  // ============================================================

  export interface JobMutationResponse {
    success: boolean;

    message: string;

    data: Job | null;

    timestamp?: string;
  }