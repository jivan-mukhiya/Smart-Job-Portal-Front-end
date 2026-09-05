
export type CompanyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

/* =============================================================
   COMPANY ADDRESS
============================================================= */

export interface CompanyAddress {
  addressLine: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

/* =============================================================
   COMPANY IMAGES
============================================================= */

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

/* =============================================================
   COMPANY STATISTICS
============================================================= */

export interface CompanyStatistics {
  profileViews: number;
  followers: number;
  activeJobs: number;
  totalJobsPosted: number;
  totalApplicants: number;
  averageRating: number;
}

/* =============================================================
   SOCIAL LINK
============================================================= */

export interface CompanySocialLink {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  displayOrder: number;
}

/* =============================================================
   COMPANY
============================================================= */

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

/* =============================================================
   SOCIAL LINK REQUEST
============================================================= */

export interface SocialLinkRequest {
  platform: string;
  url: string;
  active?: boolean;
  displayOrder?: number;
}

/* =============================================================
   COMPANY REGISTRATION REQUEST
============================================================= */

export interface CompanyRegistrationRequest {
  companyName: string;
  industry: string;
  aboutUs?: string;
  website?: string;
  email: string;
  phone: string;

  logoFile?: File;
  bannerFile?: File;

  addressLine?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  socialLinks?: SocialLinkRequest[];
}

/* =============================================================
   COMPANY UPDATE REQUEST
============================================================= */

export interface CompanyUpdateRequest {
  companyName?: string;
  industry?: string;
  aboutUs?: string;
  website?: string;
  email?: string;
  phone?: string;

  logoFile?: File;
  bannerFile?: File;

  removeLogo?: boolean;
  removeBanner?: boolean;

  addressLine?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  socialLinks?: SocialLinkRequest[];
}

/* =============================================================
   PAGINATION
============================================================= */

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

/* =============================================================
   COMPANY RESPONSE
============================================================= */

export interface CompanyResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}

/* =============================================================
   COMPANIES RESPONSE
============================================================= */

export interface CompaniesResponse {
  success: boolean;

  message: string;

  data: CompanyPageData;

  timestamp?: string;
}

/* =============================================================
   ACTIVE COMPANIES RESPONSE
============================================================= */

export type ActiveCompaniesResponse =
  CompaniesResponse;

/* =============================================================
   STATUS UPDATE REQUEST
============================================================= */

export interface CompanyStatusUpdateRequest {
  status: CompanyStatus;
}

/* =============================================================
   STATUS UPDATE RESPONSE
============================================================= */

export interface CompanyStatusResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}