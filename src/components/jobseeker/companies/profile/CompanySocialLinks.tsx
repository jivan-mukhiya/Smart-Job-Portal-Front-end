"use client";

import {
  ExternalLink,
  Share2,
} from "lucide-react";

import type { CompanySocialLink } from "@/types/company";

interface CompanySocialLinksProps {
  socialLinks?: CompanySocialLink[] | null;
}

export function CompanySocialLinks({
  socialLinks,
}: CompanySocialLinksProps) {
  const links = (socialLinks ?? [])
    .filter((link) => link.active && link.url?.trim())
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (links.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Share2 size={20} className="text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Social Links
          </h2>
          <p className="text-xs text-slate-500">
            Connect with the company online
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {links.map((link) => {
          const url = link.url.trim();

          return (
            <a
              key={link.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <Share2 size={17} className="text-slate-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatPlatformName(link.platform)}
                  </p>

                  <p className="max-w-[180px] truncate text-xs text-slate-500">
                    {url}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={16}
                className="shrink-0 text-slate-400"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function formatPlatformName(platform: string) {
  return platform
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}