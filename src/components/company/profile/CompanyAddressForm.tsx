"use client";

import { MapPin } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { FormLabel } from "@/components/ui/FormLabel";

interface Address {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface CompanyAddressFormProps {
  address: Address;

  onChange: (
    field:
      | "addressLine"
      | "city"
      | "state"
      | "country"
      | "postalCode",
    value: string,
  ) => void;
}

export function CompanyAddressForm({
  address,
  onChange,
}: CompanyAddressFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <MapPin size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Company Address
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Where is your company located?
          </p>
        </div>
      </div>

      {/* FIELDS */}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* ADDRESS */}

        <div className="sm:col-span-2">
          <FormLabel htmlFor="addressLine">
            Address
          </FormLabel>

          <Input
            id="addressLine"
            name="addressLine"
            value={
              address.addressLine
            }
            placeholder="Street address"
            leftIcon={
              <MapPin size={18} />
            }
            onChange={(event) =>
              onChange(
                "addressLine",
                event.target.value,
              )
            }
          />
        </div>

        {/* CITY */}

        <div>
          <FormLabel htmlFor="city">
            City
          </FormLabel>

          <Input
            id="city"
            name="city"
            value={address.city}
            placeholder="Kathmandu"
            onChange={(event) =>
              onChange(
                "city",
                event.target.value,
              )
            }
          />
        </div>

        {/* STATE */}

        <div>
          <FormLabel htmlFor="state">
            State
          </FormLabel>

          <Input
            id="state"
            name="state"
            value={address.state}
            placeholder="Bagmati"
            onChange={(event) =>
              onChange(
                "state",
                event.target.value,
              )
            }
          />
        </div>

        {/* COUNTRY */}

        <div>
          <FormLabel htmlFor="country">
            Country
          </FormLabel>

          <Input
            id="country"
            name="country"
            value={address.country}
            placeholder="Nepal"
            onChange={(event) =>
              onChange(
                "country",
                event.target.value,
              )
            }
          />
        </div>

        {/* POSTAL CODE */}

        <div>
          <FormLabel htmlFor="postalCode">
            Postal Code
          </FormLabel>

          <Input
            id="postalCode"
            name="postalCode"
            value={
              address.postalCode
            }
            placeholder="44600"
            onChange={(event) =>
              onChange(
                "postalCode",
                event.target.value,
              )
            }
          />
        </div>
      </div>
    </section>
  );
}
