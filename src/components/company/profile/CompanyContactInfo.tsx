"use client";

import {
  Globe,
  Mail,
  Phone,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { FormLabel } from "@/components/ui/FormLabel";

interface CompanyContactInfoProps {
  website: string;
  email: string;
  phone: string;

  onChange: (
    field:
      | "website"
      | "email"
      | "phone",
    value: string,
  ) => void;
}

export function CompanyContactInfo({
  website,
  email,
  phone,
  onChange,
}: CompanyContactInfoProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-bold text-slate-950">
          Contact Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Provide contact details for your company.
        </p>
      </div>

      {/* FIELDS */}

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {/* WEBSITE */}

        <div>
          <FormLabel htmlFor="website">
            Website
          </FormLabel>

          <Input
            id="website"
            name="website"
            type="url"
            value={website}
            placeholder="https://example.com"
            leftIcon={
              <Globe size={18} />
            }
            onChange={(event) =>
              onChange(
                "website",
                event.target.value,
              )
            }
          />
        </div>

        {/* EMAIL */}

        <div>
          <FormLabel
            htmlFor="email"
            required
          >
            Email
          </FormLabel>

          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="company@example.com"
            leftIcon={
              <Mail size={18} />
            }
            onChange={(event) =>
              onChange(
                "email",
                event.target.value,
              )
            }
          />
        </div>

        {/* PHONE */}

        <div className="md:col-span-2">
          <FormLabel
            htmlFor="phone"
            required
          >
            Phone
          </FormLabel>

          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            placeholder="+977 98XXXXXXXX"
            leftIcon={
              <Phone size={18} />
            }
            onChange={(event) =>
              onChange(
                "phone",
                event.target.value,
              )
            }
          />
        </div>
      </div>
    </section>
  );
}

