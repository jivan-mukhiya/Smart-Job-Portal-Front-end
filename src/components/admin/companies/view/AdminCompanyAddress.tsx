
import { MapPin } from "lucide-react";

interface AdminCompanyAddressProps {
  address: {
    addressLine: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
  };
}

export function AdminCompanyAddress({
  address,
}: AdminCompanyAddressProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-950">
        Address
      </h2>

      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <MapPin
            size={17}
            className="text-slate-600"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {address.addressLine || "Address not available"}
          </p>

          {(address.city || address.state) && (
            <p className="mt-1 text-sm text-slate-500">
              {address.city}
              {address.city && address.state ? ", " : ""}
              {address.state}
            </p>
          )}

          {(address.country || address.postalCode) && (
            <p className="text-sm text-slate-500">
              {address.country}
              {address.country && address.postalCode
                ? " "
                : ""}
              {address.postalCode}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
