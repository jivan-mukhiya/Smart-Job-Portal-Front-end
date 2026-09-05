"use client";

import {
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FormLabel } from "@/components/ui/FormLabel";

interface CompanyBasicInfoProps {
  companyName: string;
  industry: string;
  aboutUs: string;

  onChange: (
    field:
      | "companyName"
      | "industry"
      | "aboutUs",
    value: string,
  ) => void;
}

export function CompanyBasicInfo({
  companyName,
  industry,
  aboutUs,
  onChange,
}: CompanyBasicInfoProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Building2 size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Company Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tell people about your company.
          </p>
        </div>
      </div>

      {/* FIELDS */}

      <div className="mt-7 space-y-5">
        {/* COMPANY NAME */}

        <div>
          <FormLabel
            htmlFor="companyName"
            required
          >
            Company Name
          </FormLabel>

          <Input
            id="companyName"
            name="companyName"
            value={companyName}
            placeholder="Enter company name"
            leftIcon={
              <Building2 size={18} />
            }
            onChange={(event) =>
              onChange(
                "companyName",
                event.target.value,
              )
            }
          />
        </div>

        {/* INDUSTRY */}

        <div>
          <FormLabel
            htmlFor="industry"
            required
          >
            Industry
          </FormLabel>

          <Input
            id="industry"
            name="industry"
            value={industry}
            placeholder="e.g. Information Technology"
            leftIcon={
              <BriefcaseBusiness
                size={18}
              />
            }
            onChange={(event) =>
              onChange(
                "industry",
                event.target.value,
              )
            }
          />
        </div>

        {/* ABOUT */}

        <div>
          <FormLabel htmlFor="aboutUs">
            About Company
          </FormLabel>

          <Textarea
            id="aboutUs"
            name="aboutUs"
            value={aboutUs}
            placeholder="Tell us about your company..."
            rows={6}
            onChange={(event) =>
              onChange(
                "aboutUs",
                event.target.value,
              )
            }
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Describe your company, culture,
            products and services.
          </p>
        </div>
      </div>
    </section>
  );
}

