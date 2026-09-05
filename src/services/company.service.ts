import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  ActiveCompaniesResponse,
  CompaniesResponse,
  CompanyResponse,
  CompanyStatus,
  CompanyStatusResponse,
} from "@/types/company";

export const companyService = {
  // ============================================================
  // GET ALL COMPANIES
  //
  // GET /companies?page=0&size=20
  //
  // ADMIN ONLY
  // ============================================================

  getCompanies(
    page: number = 0,
    size: number = 20,
  ): Promise<CompaniesResponse> {
    return apiClient<CompaniesResponse>(
      api.companies.all,
      {
        method: "GET",

        params: {
          page,
          size,
        },
      },
    );
  },

  // ============================================================
  // GET ACTIVE COMPANIES
  //
  // GET /companies/active?page=0&size=20
  //
  // PUBLIC / ACTIVE COMPANIES
  // ============================================================

  getActiveCompanies(
    page: number = 0,
    size: number = 20,
  ): Promise<ActiveCompaniesResponse> {
    return apiClient<ActiveCompaniesResponse>(
      api.companies.active,
      {
        method: "GET",

        params: {
          page,
          size,
        },
      },
    );
  },

  // ============================================================
  // GET MY COMPANY
  //
  // GET /companies/me
  //
  // LOGGED-IN COMPANY
  // ============================================================

  getMyCompany(): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(
      api.companies.me,
      {
        method: "GET",
      },
    );
  },

  // ============================================================
  // GET COMPANY BY ID
  //
  // GET /companies/{companyId}
  // ============================================================

  getCompanyById(
    id: number | string,
  ): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(
      api.companies.byId(id),
      {
        method: "GET",
      },
    );
  },

  // ============================================================
  // CREATE COMPANY
  //
  // POST /companies
  // ============================================================

  createCompany(
    formData: FormData,
  ): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(
      api.companies.create,
      {
        method: "POST",

        data: formData,
      },
    );
  },

  // ============================================================
  // UPDATE COMPANY
  //
  // PUT /companies/{companyId}
  // ============================================================

  updateCompany(
    id: number | string,
    formData: FormData,
  ): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(
      api.companies.update(id),
      {
        method: "PUT",

        data: formData,
      },
    );
  },

  // ============================================================
  // UPDATE COMPANY STATUS
  //
  // PATCH /companies/{companyId}/status
  //
  // Body:
  //
  // {
  //   "status": "APPROVED"
  // }
  //
  // Possible:
  //
  // PENDING
  // APPROVED
  // REJECTED
  // SUSPENDED
  // ============================================================

  updateCompanyStatus(
    id: number | string,
    status: CompanyStatus,
  ): Promise<CompanyStatusResponse> {
    return apiClient<CompanyStatusResponse>(
      api.companies.status(id),
      {
        method: "PATCH",

        data: {
          status,
        },
      },
    );
  },
};