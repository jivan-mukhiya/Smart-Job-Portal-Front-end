import {
  ExternalLink,
  Share2,
} from "lucide-react";

import type {
  CompanySocialLink,
} from "@/types/company";

interface CompanySocialLinksProps {
  socialLinks?: CompanySocialLink[] | null;
}

export function CompanySocialLinks({
  socialLinks = [],
}: CompanySocialLinksProps) {
  const activeLinks = [...(socialLinks ?? [])]
    .filter(
      (social) =>
        social.active &&
        social.url?.trim(),
    )
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder,
    );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Share2 size={18} />
        </div>

        <h2 className="text-lg font-bold text-slate-950">
          Social Links
        </h2>

      </div>

      {activeLinks.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {activeLinks.map((social) => {
            const url =
              social.url.trim();

            return (
              <a
                key={social.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
              >

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-slate-800">
                    {social.platform ||
                      "Social Media"}
                  </p>

                  <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                    {url}
                  </p>

                </div>

                <ExternalLink
                  size={16}
                  className="shrink-0 text-slate-400 transition group-hover:text-slate-950"
                />

              </a>
            );
          })}

        </div>
      ) : (
        <p className="mt-5 text-sm text-slate-400">
          No social links have been added yet.
        </p>
      )}

    </section>
  );
}