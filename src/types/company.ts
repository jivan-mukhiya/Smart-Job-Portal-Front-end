export type CompanyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

/* ============================================================
   COMPANY ADDRESS
============================================================ */

export interface CompanyAddress {
  addressLine: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

/* ============================================================
   COMPANY IMAGES
============================================================ */

export interface CompanyImages {
  logoPath: string | null;
  logoFileName: string | null;
  logoFileSize: string | null;
  logoContentType: string | null;

  bannerPath: string | null;
  bannerFileName: string | null;
  bannerFileSize: string | null;
  bannerContentType: string | null;

  logoUrl: string | null;
  bannerUrl: string | null;
}

/* ============================================================
   COMPANY STATISTICS
============================================================ */

export interface CompanyStatistics {
  profileViews: number;
  followers: number;
  activeJobs: number;
  totalJobsPosted: number;
  totalApplicants: number;
  averageRating: number;
}

/* ============================================================
   COMPANY SOCIAL LINK
============================================================ */

export interface CompanySocialLink {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  displayOrder: number;
}

/* ============================================================
   COMPANY
============================================================ */

export interface Company {
  id: number;

  companyName: string;

  industry: string | null;

  aboutUs: string | null;

  website: string | null;

  email: string | null;

  phone: string | null;

  status: CompanyStatus;

  approved: boolean;

  active: boolean;

  address: CompanyAddress | null;

  images: CompanyImages | null;

  statistics: CompanyStatistics | null;

  socialLinks: CompanySocialLink[];

  createdAt: string;

  updatedAt: string;
}

/* ============================================================
   COMPANY PAGE DATA
============================================================ */

export interface CompanyPageData {
  content: Company[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;

  empty: boolean;
}

/* ============================================================
   COMPANY RESPONSE
============================================================ */

export interface CompanyResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}

/* ============================================================
   COMPANIES RESPONSE
============================================================ */

export interface CompaniesResponse {
  success: boolean;

  message: string;

  data: CompanyPageData;

  timestamp?: string;
}

/**
 * /companies/active has the same pagination structure
 * as /companies.
 */
export type ActiveCompaniesResponse =
  CompaniesResponse;

/* ============================================================
   COMPANY STATUS UPDATE REQUEST
============================================================ */

export interface CompanyStatusUpdateRequest {
  status: CompanyStatus;
}

/* ============================================================
   COMPANY STATUS RESPONSE
============================================================ */

export interface CompanyStatusResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}

/* ============================================================
   COMPANY LOGO RESPONSE
============================================================ */

/**
 * GET /companies/{companyId}/logo
 *
 * Backend returns:
 *
 * {
 *   "success": true,
 *   "message": "Company logo retrieved successfully",
 *   "data": "http://localhost:9000/api/v1/files/uploads/company/logo/....jpg",
 *   "timestamp": "..."
 * }
 */
export interface CompanyLogoResponse {
  success: boolean;

  message: string;

  data: string | null;

  timestamp?: string;
}