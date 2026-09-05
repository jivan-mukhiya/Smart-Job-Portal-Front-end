import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { FooterLink } from "./components/FooterLink";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href={routes.home}
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                <BriefcaseBusiness size={19} />
              </div>

              <span className="font-bold text-slate-950">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              {siteConfig.description}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-slate-950">
              Platform
            </h4>

            <div className="mt-4 space-y-3">
              <FooterLink
                href={routes.home}
                label="Home"
              />

              <FooterLink
                href={routes.jobs.all}
                label="Find Jobs"
              />

              <FooterLink
                href={routes.companies.all}
                label="Companies"
              />
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold text-slate-950">
              Account
            </h4>

            <div className="mt-4 space-y-3">
              <FooterLink
                href={routes.auth.login}
                label="Login"
              />

              <FooterLink
                href={routes.auth.register}
                label="Register"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            Built for better careers.
          </p>
        </div>
      </div>
    </footer>
  );
}