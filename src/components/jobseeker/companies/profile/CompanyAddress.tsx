import { MapPin } from "lucide-react";

import type { CompanyAddress as Address } from "@/types/company";

interface CompanyAddressProps {
  address?: Address | null;
}

export function CompanyAddress({
  address,
}: CompanyAddressProps) {
  if (!address) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">
        Address
      </h2>

      <div className="mt-5 flex gap-3">
        <MapPin
          size={18}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <div className="space-y-1 text-sm text-slate-600">
          {address.addressLine && (
            <p className="font-medium text-slate-700">
              {address.addressLine}
            </p>
          )}

          {address.city && (
            <p>{address.city}</p>
          )}

          {address.state && (
            <p>{address.state}</p>
          )}

          {address.country && (
            <p>{address.country}</p>
          )}

          {address.postalCode && (
            <p>{address.postalCode}</p>
          )}
        </div>
      </div>
    </section>
  );
}