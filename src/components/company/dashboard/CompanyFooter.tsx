import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

export function CompanyFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* =====================================================
              BRAND
          ===================================================== */}

          <div className="md:col-span-2">

            <Link
              href={routes.company.dashboard}
              className="inline-flex items-center gap-3"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  {siteConfig.name}
                </p>

                <p className="text-xs text-slate-500">
                  Company Portal
                </p>
              </div>

            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Manage your company profile, publish job opportunities,
              and connect with talented professionals.
            </p>

          </div>

          {/* =====================================================
              COMPANY
          ===================================================== */}

          <div>

            <h3 className="text-sm font-bold text-slate-950">
              Company
            </h3>

            <div className="mt-4 space-y-3">

              <FooterLink
                href={routes.company.dashboard}
                label="Dashboard"
              />

              <FooterLink
                href={routes.company.profile.view}
                label="Company Profile"
              />

              <FooterLink
                href={routes.company.jobs.all}
                label="Manage Jobs"
              />

              <FooterLink
                href={routes.company.jobs.create}
                label="Post a Job"
              />

            </div>

          </div>

          {/* =====================================================
              ACCOUNT
          ===================================================== */}

          <div>

            <h3 className="text-sm font-bold text-slate-950">
              Account
            </h3>

            <div className="mt-4 space-y-3">

              <FooterLink
                href={routes.auth.login}
                label="Login"
              />

              <FooterLink
                href={routes.home}
                label="Main Website"
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} {siteConfig.name}.
            All rights reserved.
          </p>

          <p>
            Company Portal
          </p>

        </div>

      </div>

    </footer>
  );
}


/* =============================================================
   FOOTER LINK
============================================================= */

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-950"
    >
      {label}

      <ChevronRight size={14} />
    </Link>
  );
}