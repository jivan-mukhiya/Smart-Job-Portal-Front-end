import { ExternalLink } from "lucide-react";

import type {
  JobSeekerSocialProfile,
} from "@/types/jobseeker";

interface SocialCardProps {
  socialProfiles: JobSeekerSocialProfile[];
}

export function SocialCard({
  socialProfiles,
}: SocialCardProps) {
  const activeProfiles =
    socialProfiles.filter(
      (profile) => profile.active
    );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      {/* Header */}

      <h2 className="text-sm font-bold text-slate-950">
        Social Profiles
      </h2>


      {/* Social Links */}

      <div className="mt-4 space-y-2">

        {activeProfiles.length > 0 ? (
          activeProfiles.map((profile) => (
            <SocialLink
              key={profile.id}
              platform={profile.platform}
              label={formatPlatform(
                profile.platform
              )}
              href={profile.url}
            />
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No social profiles added.
          </p>
        )}

      </div>

    </section>
  );
}


/* =============================================================
   SOCIAL LINK
============================================================= */

function SocialLink({
  platform,
  label,
  href,
}: {
  platform: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={normalizeUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        px-3
        py-3
        text-sm
        font-medium
        text-slate-700
        transition
        hover:bg-slate-50
        hover:border-slate-300
      "
    >

      {/* Left */}

      <span className="flex items-center gap-3">

        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-slate-100
            text-slate-700
          "
        >
          {getPlatformIcon(platform)}
        </span>

        <span>
          {label}
        </span>

      </span>


      {/* Right */}

      <ExternalLink
        size={15}
        className="text-slate-400"
      />

    </a>
  );
}


/* =============================================================
   PLATFORM NAME
============================================================= */

function formatPlatform(
  platform: string
) {
  return platform
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );
}


/* =============================================================
   PLATFORM ICON
============================================================= */

function getPlatformIcon(
  platform: string
) {
  switch (platform.toUpperCase()) {

    case "LINKEDIN":
      return (
        <span className="text-sm font-extrabold">
          in
        </span>
      );

    case "GITHUB":
      return (
        <span className="text-xs font-extrabold">
          GH
        </span>
      );

    default:
      return (
        <span className="text-xs font-extrabold">
          {platform
            .slice(0, 2)
            .toUpperCase()}
        </span>
      );
  }
}


/* =============================================================
   URL NORMALIZATION
============================================================= */

function normalizeUrl(
  url: string
) {
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `https://${url}`;
}