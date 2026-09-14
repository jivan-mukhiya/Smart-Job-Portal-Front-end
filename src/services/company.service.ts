import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  ActiveCompaniesResponse,
  CompaniesResponse,
  CompanyLogoResponse,
  CompanyResponse,
  CompanyStatus,
  CompanyStatusResponse,
} from "@/types/company";

export const companyService = {
  // ============================================================
  // ADMIN
  // GET /companies?page=0&size=20
  // Returns ALL companies
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
  // PUBLIC
  // GET /companies/active?page=0&size=20
  // Returns only active companies
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
  // COMPANY
  // GET /companies/me
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
  // PUBLIC / AUTHENTICATED
  // GET /companies/{id}
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
  // PUBLIC
  // GET /companies/{id}/logo
  //
  // Returns the complete logo URL:
  // http://localhost:9000/api/v1/files/uploads/company/logo/...
  // ============================================================

  getCompanyLogo(
    id: number | string,
  ): Promise<CompanyLogoResponse> {
    return apiClient<CompanyLogoResponse>(
      api.companies.logo(id),
      {
        method: "GET",
      },
    );
  },

  // ============================================================
  // COMPANY
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
  // COMPANY
  // PUT /companies/{id}
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
  // ADMIN
  // PATCH /companies/{id}/status
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