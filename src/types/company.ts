export type CompanyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

export interface CompanyAddress {
  addressLine: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

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

export interface CompanyStatistics {
  profileViews: number;
  followers: number;
  activeJobs: number;
  totalJobsPosted: number;
  totalApplicants: number;
  averageRating: number;
}

export interface CompanySocialLink {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  displayOrder: number;
}

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

export interface CompanyResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}

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

export interface CompanyStatusUpdateRequest {
  status: CompanyStatus;
}

export interface CompanyStatusResponse {
  success: boolean;

  message: string;

  data: Company | null;

  timestamp?: string;
}