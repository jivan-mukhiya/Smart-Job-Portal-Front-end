
import type {
  CompanyStatus,
} from "@/types/company";

/* =============================================================
   RE-EXPORT COMPANY STATUS
============================================================= */

export type {
  CompanyStatus,
} from "@/types/company";

/* =============================================================
   ADMIN COMPANY TABLE DATA
============================================================= */

export interface AdminCompany {
  id: number;

  companyName: string;

  industry: string | null;

  email: string | null;

  phone: string | null;

  status: CompanyStatus;

  approved: boolean;

  active: boolean;

  logoUrl: string | null;
}