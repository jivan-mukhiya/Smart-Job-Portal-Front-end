import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import type {
  ApplicationApplicant,
} from "@/types/application";

import type {
  JobSeekerProfile,
} from "@/types/jobseeker";

interface Props {
  applicant: ApplicationApplicant;

  profile: JobSeekerProfile | null;

  loading: boolean;
}

export function ApplicantInformation({
  applicant,
  profile,
  loading,
}: Props) {
  const skills =
    profile?.skills
      ?.filter(
        skill => skill.active,
      )
      ?.sort(
        (a, b) =>
          a.displayOrder -
          b.displayOrder,
      ) ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <SectionTitle
        icon={
          <User size={18} />
        }
        title="Applicant Information"
        description="Candidate profile details"
      />

      <div className="grid gap-5 p-6 sm:grid-cols-2">

        <Info
          icon={
            <User size={16} />
          }
          label="Full Name"
          value={
            applicant.fullName
          }
        />

        <Info
          icon={
            <BriefcaseBusiness
              size={16}
            />
          }
          label="Professional Title"
          value={
            profile?.professionalTitle ??
            applicant.professionalTitle
          }
        />

        <Info
          icon={
            <Mail size={16} />
          }
          label="Email"
          value={
            applicant.email
          }
        />

        <Info
          icon={
            <Phone size={16} />
          }
          label="Phone"
          value={
            profile?.phone ??
            applicant.phone
          }
        />

        <Info
          icon={
            <MapPin size={16} />
          }
          label="Address"
          value={
            profile?.address ??
            applicant.address
          }
        />

        <Info
          icon={
            <Clock3 size={16} />
          }
          label="Experience"
          value={
            formatExperience(
              profile?.yearsOfExperience ??
                applicant.yearsOfExperience,
            )
          }
        />

        <Info
          icon={
            <GraduationCap
              size={16}
            />
          }
          label="Highest Education"
          value={
            profile?.highestEducation ??
            applicant.highestEducation
          }
        />

        <Info
          icon={
            <CheckCircle2
              size={16}
            />
          }
          label="Open to Work"
          value={
            (
              profile?.openToWork ??
              applicant.openToWork
            )
              ? "Yes"
              : "No"
          }
        />

      </div>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      {(profile?.about ??
        applicant.about) && (
        <div className="border-t border-slate-100 px-6 py-5">

          <p className="text-sm font-semibold text-slate-950">
            About
          </p>

          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
            {profile?.about ??
              applicant.about}
          </p>

        </div>
      )}

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <div className="border-t border-slate-100 px-6 py-5">

        <p className="text-sm font-semibold text-slate-950">
          Skills
        </p>

        {loading ? (
          <p className="mt-3 text-sm text-slate-400">
            Loading skills...
          </p>
        ) : skills.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">

            {skills.map(
              skill => (
                <span
                  key={skill.id}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {skill.skillName}
                </span>
              ),
            )}

          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">
            No skills provided.
          </p>
        )}

      </div>

      {/* =====================================================
          SOCIAL PROFILES
      ===================================================== */}

      {profile &&
        profile.socialProfiles
          ?.filter(
            social =>
              social.active,
          ).length > 0 && (
          <div className="border-t border-slate-100 px-6 py-5">

            <p className="text-sm font-semibold text-slate-950">
              Social Profiles
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {profile.socialProfiles
                .filter(
                  social =>
                    social.active,
                )
                .map(
                  social => (
                    <a
                      key={
                        social.id
                      }
                      href={
                        social.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {formatPlatform(
                        social.platform,
                      )}
                    </a>
                  ),
                )}

            </div>

          </div>
        )}

    </section>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div>

        <h2 className="font-bold text-slate-950">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-800">
          {value ||
            "Not provided"}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function formatExperience(
  value: number | null | undefined,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  return `${value} ${
    value === 1
      ? "year"
      : "years"
  }`;
}

/* =========================================================
   SOCIAL PLATFORM
========================================================= */

function formatPlatform(
  value: string,
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}