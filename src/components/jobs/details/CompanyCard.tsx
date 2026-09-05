"use client";

import { ArrowRight, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

interface CompanyCardProps {
  companyId: number;
  companyName: string;
}

export function CompanyCard({
  companyId,
  companyName,
}: CompanyCardProps) {
  const router = useRouter();

  const handleCompanyView = () => {
    router.push(routes.companies.details(companyId));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        About the company
      </p>

      {/* =====================================================
          COMPANY
      ===================================================== */}

      <div className="mt-5 flex items-center gap-3">
        {/* COMPANY ICON */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          <Building2
            size={23}
            strokeWidth={1.8}
            className="text-slate-500"
          />
        </div>

        {/* COMPANY INFORMATION */}

        <div className="min-w-0">
          <h3 className="truncate font-bold text-slate-950">
            {companyName}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Employer
          </p>
        </div>
      </div>

      {/* =====================================================
          BUTTON
      ===================================================== */}

      <Button
        type="button"
        variant="outline"
        fullWidth
        className="mt-5"
        rightIcon={<ArrowRight size={16} />}
        onClick={handleCompanyView}
      >
        View Company
      </Button>
    </section>
  );
}
