import { MapPin } from "lucide-react";

import type {
  CompanyAddress as CompanyAddressType,
} from "@/types/company";

interface CompanyAddressProps {
  address?: CompanyAddressType | null;
}

export function CompanyAddress({
  address,
}: CompanyAddressProps) {
  const hasAddress =
    address?.addressLine ||
    address?.city ||
    address?.state ||
    address?.country ||
    address?.postalCode;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <MapPin size={17} />
        </div>

        <h2 className="text-sm font-bold text-slate-950">
          Location
        </h2>

      </div>

      {hasAddress ? (
        <div className="mt-5 space-y-1 text-sm leading-6 text-slate-600">

          {address?.addressLine && (
            <p>
              {address.addressLine}
            </p>
          )}

          {(address?.city ||
            address?.state) && (
            <p>
              {[
                address.city,
                address.state,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}

          {(address?.country ||
            address?.postalCode) && (
            <p>
              {[
                address.country,
                address.postalCode,
              ]
                .filter(Boolean)
                .join(" - ")}
            </p>
          )}

        </div>
      ) : (
        <p className="mt-5 text-sm text-slate-400">
          No address information has been added yet.
        </p>
      )}

    </section>
  );
}