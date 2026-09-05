import { Gift } from "lucide-react";

import type { JobBenefit } from "@/types/job";

interface JobViewBenefitsProps {
  benefits: JobBenefit[];
}

export function JobViewBenefits({
  benefits,
}: JobViewBenefitsProps) {
  if (!benefits?.length) {
    return null;
  }

  const sortedBenefits = [...benefits].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder,
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-gray-900">
        Benefits
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {sortedBenefits.map((benefit) => (
          <div
            key={benefit.id}
            className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
              <Gift className="h-5 w-5 text-gray-600" />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900">
                {benefit.benefitName}
              </h3>

              {benefit.description && (
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}