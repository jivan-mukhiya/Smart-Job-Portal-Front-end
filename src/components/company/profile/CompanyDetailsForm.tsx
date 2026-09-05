"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import { companyService } from "@/services/company.service";
import { ApiError } from "@/lib/api-error";
import { routes } from "@/config/routes";

import type { Company } from "@/types/company";

import { CompanyBasicInfo } from "./CompanyBasicInfo";
import { CompanyImages } from "./CompanyImages";
import { CompanyContactInfo } from "./CompanyContactInfo";
import { CompanyAddressForm } from "./CompanyAddressForm";
import { CompanySocialLinks } from "./CompanySocialLinks";

/* =========================================================
   FORM TYPES
========================================================= */

interface FormAddress {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface FormSocialLink {
  platform: string;
  url: string;
}

interface CompanyFormData {
  companyName: string;
  industry: string;
  aboutUs: string;

  website: string;
  email: string;
  phone: string;

  logoFile: File | null;
  bannerFile: File | null;

  address: FormAddress;

  socialLinks: FormSocialLink[];
}

/* =========================================================
   EMPTY FORM FACTORY
========================================================= */

const createEmptyForm =
  (): CompanyFormData => ({
    companyName: "",
    industry: "",
    aboutUs: "",

    website: "",
    email: "",
    phone: "",

    logoFile: null,
    bannerFile: null,

    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },

    socialLinks: [
      {
        platform: "",
        url: "",
      },
    ],
  });

/* =========================================================
   COMPONENT
========================================================= */

export function CompanyDetailsForm() {
  const router = useRouter();

  const [company, setCompany] =
    useState<Company | null>(null);

  const [formData, setFormData] =
    useState<CompanyFormData>(
      createEmptyForm(),
    );

  const [loading, setLoading] =
    useState(false);

  const [loadingCompany, setLoadingCompany] =
    useState(true);

  const [removeLogo, setRemoveLogo] =
    useState(false);

  const [removeBanner, setRemoveBanner] =
    useState(false);

  /* =========================================================
     LOAD MY COMPANY

     GET /api/v1/companies/me
  ========================================================= */

  const loadCompany = useCallback(
    async () => {
      try {
        setLoadingCompany(true);

        const response =
          await companyService.getMyCompany();

        /* =================================================
           COMPANY EXISTS
        ================================================= */

        if (
          response.success &&
          response.data
        ) {
          const data =
            response.data;

          setCompany(data);

          setFormData({
            companyName:
              data.companyName ?? "",

            industry:
              data.industry ?? "",

            aboutUs:
              data.aboutUs ?? "",

            website:
              data.website ?? "",

            email:
              data.email ?? "",

            phone:
              data.phone ?? "",

            logoFile: null,

            bannerFile: null,

            address: {
              addressLine:
                data.address
                  ?.addressLine ?? "",

              city:
                data.address
                  ?.city ?? "",

              state:
                data.address
                  ?.state ?? "",

              country:
                data.address
                  ?.country ?? "",

              postalCode:
                data.address
                  ?.postalCode ?? "",
            },

            socialLinks:
              data.socialLinks?.map(
                (social) => ({
                  platform:
                    social.platform ?? "",

                  url:
                    social.url ?? "",
                }),
              ) ?? [],
          });

          setRemoveLogo(false);

          setRemoveBanner(false);

          return;
        }

        /* =================================================
           NO COMPANY

           success: true
           data: null
        ================================================= */

        resetForm();
      } catch (error: unknown) {
        /* =================================================
           404 = NO COMPANY
        ================================================= */

        if (
          isNotFoundError(error)
        ) {
          resetForm();

          return;
        }

        /* =================================================
           REAL ERROR
        ================================================= */

        const message =
          getErrorMessage(
            error,
            "Unable to load company details.",
          );

        toast.error(message);
      } finally {
        setLoadingCompany(false);
      }
    },
    [],
  );

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setCompany(null);

    setFormData(
      createEmptyForm(),
    );

    setRemoveLogo(false);

    setRemoveBanner(false);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    /* =================================================
       VALIDATION
    ================================================= */

    if (
      !formData.companyName.trim()
    ) {
      toast.error(
        "Company name is required.",
      );

      return;
    }

    if (
      !formData.industry.trim()
    ) {
      toast.error(
        "Industry is required.",
      );

      return;
    }

    if (!formData.email.trim()) {
      toast.error(
        "Email is required.",
      );

      return;
    }

    if (!formData.phone.trim()) {
      toast.error(
        "Phone number is required.",
      );

      return;
    }

    try {
      setLoading(true);

      const data =
        new FormData();

      /* =================================================
         BASIC INFORMATION
      ================================================= */

      data.append(
        "companyName",
        formData.companyName.trim(),
      );

      data.append(
        "industry",
        formData.industry.trim(),
      );

      data.append(
        "aboutUs",
        formData.aboutUs.trim(),
      );

      /* =================================================
         CONTACT
      ================================================= */

      data.append(
        "website",
        formData.website.trim(),
      );

      data.append(
        "email",
        formData.email.trim(),
      );

      data.append(
        "phone",
        formData.phone.trim(),
      );

      /* =================================================
         ADDRESS
      ================================================= */

      data.append(
        "addressLine",
        formData.address.addressLine.trim(),
      );

      data.append(
        "city",
        formData.address.city.trim(),
      );

      data.append(
        "state",
        formData.address.state.trim(),
      );

      data.append(
        "country",
        formData.address.country.trim(),
      );

      data.append(
        "postalCode",
        formData.address.postalCode.trim(),
      );

      /* =================================================
         LOGO
      ================================================= */

      if (formData.logoFile) {
        data.append(
          "logoFile",
          formData.logoFile,
        );
      }

      /* =================================================
         BANNER
      ================================================= */

      if (formData.bannerFile) {
        data.append(
          "bannerFile",
          formData.bannerFile,
        );
      }

      /* =================================================
         UPDATE-ONLY IMAGE FLAGS
      ================================================= */

      if (company) {
        data.append(
          "removeLogo",
          String(removeLogo),
        );

        data.append(
          "removeBanner",
          String(removeBanner),
        );
      }

      /* =================================================
         SOCIAL LINKS
      ================================================= */

      const validSocialLinks =
        formData.socialLinks.filter(
          (social) =>
            social.platform.trim() &&
            social.url.trim(),
        );

      validSocialLinks.forEach(
        (
          social,
          index,
        ) => {
          data.append(
            `socialLinks[${index}].platform`,
            social.platform.trim(),
          );

          data.append(
            `socialLinks[${index}].url`,
            social.url.trim(),
          );

          data.append(
            `socialLinks[${index}].active`,
            "true",
          );

          data.append(
            `socialLinks[${index}].displayOrder`,
            String(index),
          );
        },
      );

      /* =================================================
         UPDATE EXISTING COMPANY

         PUT /api/v1/companies/{id}
      ================================================= */

      if (company) {
        const response =
          await companyService.updateCompany(
            company.id,
            data,
          );

        if (!response.success) {
          toast.error(
            response.message ||
              "Unable to update company.",
          );

          return;
        }

        toast.success(
          "Company details updated successfully.",
        );

        router.push(
          routes.company.profile.view,
        );

        router.refresh();

        return;
      }

      /* =================================================
         CREATE COMPANY

         POST /api/v1/companies
      ================================================= */

      const response =
        await companyService.createCompany(
          data,
        );

      if (!response.success) {
        toast.error(
          response.message ||
            "Unable to create company.",
        );

        return;
      }

      toast.success(
        "Company created successfully.",
      );

      router.push(
        routes.company.profile.view,
      );

      router.refresh();
    } catch (error: unknown) {
      const message =
        getErrorMessage(
          error,
          "Unable to save company details.",
        );

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loadingCompany) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading company details...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <CompanyBasicInfo
        companyName={
          formData.companyName
        }
        industry={
          formData.industry
        }
        aboutUs={
          formData.aboutUs
        }
        onChange={(
          field,
          value,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,
              [field]: value,
            }),
          );
        }}
      />

      {/* =================================================
          IMAGES
      ================================================= */}

      <CompanyImages
        logoFile={
          formData.logoFile
        }
        bannerFile={
          formData.bannerFile
        }

        existingLogoUrl={
          company?.images?.logoUrl ??
          null
        }

        existingBannerUrl={
          company?.images?.bannerUrl ??
          null
        }

        logoRemoved={
          removeLogo
        }

        bannerRemoved={
          removeBanner
        }

        onLogoChange={(
          file,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,
              logoFile: file,
            }),
          );

          if (file) {
            setRemoveLogo(false);
          }
        }}

        onBannerChange={(
          file,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,
              bannerFile: file,
            }),
          );

          if (file) {
            setRemoveBanner(false);
          }
        }}

        onRemoveLogo={() => {
          setRemoveLogo(true);

          setFormData(
            (previous) => ({
              ...previous,
              logoFile: null,
            }),
          );
        }}

        onRemoveBanner={() => {
          setRemoveBanner(true);

          setFormData(
            (previous) => ({
              ...previous,
              bannerFile: null,
            }),
          );
        }}
      />

      {/* =================================================
          CONTACT
      ================================================= */}

      <CompanyContactInfo
        website={
          formData.website
        }
        email={
          formData.email
        }
        phone={
          formData.phone
        }
        onChange={(
          field,
          value,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,
              [field]: value,
            }),
          );
        }}
      />

      {/* =================================================
          ADDRESS
      ================================================= */}

      <CompanyAddressForm
        address={
          formData.address
        }
        onChange={(
          field,
          value,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,

              address: {
                ...previous.address,
                [field]: value,
              },
            }),
          );
        }}
      />

      {/* =================================================
          SOCIAL LINKS
      ================================================= */}

      <CompanySocialLinks
        socialLinks={
          formData.socialLinks
        }

        onChange={(
          index,
          field,
          value,
        ) => {
          setFormData(
            (previous) => {
              const links = [
                ...previous.socialLinks,
              ];

              links[index] = {
                ...links[index],
                [field]: value,
              };

              return {
                ...previous,
                socialLinks: links,
              };
            },
          );
        }}

        onAdd={() => {
          setFormData(
            (previous) => ({
              ...previous,

              socialLinks: [
                ...previous.socialLinks,

                {
                  platform: "",
                  url: "",
                },
              ],
            }),
          );
        }}

        onRemove={(
          index,
        ) => {
          setFormData(
            (previous) => ({
              ...previous,

              socialLinks:
                previous.socialLinks.filter(
                  (
                    _,
                    itemIndex,
                  ) =>
                    itemIndex !==
                    index,
                ),
            }),
          );
        }}
      />

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={loading}
          onClick={() =>
            router.push(
              routes.company.profile.view,
            )
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          size="lg"
          loading={loading}
          leftIcon={
            <Save size={17} />
          }
        >
          {company
            ? "Update Company Details"
            : "Save Company Details"}
        </Button>
      </div>
    </form>
  );
}

/* =========================================================
   ERROR MESSAGE
========================================================= */

function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    const value =
      error as {
        message?: unknown;
      };

    if (
      typeof value.message === "string" &&
      value.message
    ) {
      return value.message;
    }
  }

  return fallback;
}

/* =========================================================
   404 DETECTION
========================================================= */

function isNotFoundError(
  error: unknown,
): boolean {
  if (error instanceof ApiError) {
    const apiError =
      error as ApiError & {
        status?: number;

        statusCode?: number;

        response?: {
          status?: number;
        };
      };

    if (
      apiError.status === 404 ||
      apiError.statusCode === 404 ||
      apiError.response?.status === 404
    ) {
      return true;
    }

    if (
      apiError.message
        ?.toLowerCase()
        .includes("company not found")
    ) {
      return true;
    }
  }

  if (
    error instanceof Error &&
    error.message
      .toLowerCase()
      .includes("company not found")
  ) {
    return true;
  }

  if (
    typeof error === "object" &&
    error !== null
  ) {
    const value =
      error as {
        status?: unknown;

        statusCode?: unknown;

        message?: unknown;

        response?: {
          status?: unknown;
        };
      };

    if (
      value.status === 404 ||
      value.statusCode === 404 ||
      value.response?.status === 404
    ) {
      return true;
    }

    if (
      typeof value.message === "string" &&
      value.message
        .toLowerCase()
        .includes("company not found")
    ) {
      return true;
    }
  }

  return false;
}
