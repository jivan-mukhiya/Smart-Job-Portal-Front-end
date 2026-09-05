"use client";

import { RefreshCw } from "lucide-react";

import { AboutSection } from "./AboutSection";
import { ContactCard } from "./ContactCard";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { ResumeCard } from "./ResumeCard";
import { SkillsSection } from "./SkillsSection";
import { SocialCard } from "./SocialCard";

import { useJobSeekerProfile } from "@/hooks/useJobSeekerProfile";

export default function JobSeekerProfile() {
  const {
    profile,
    loading,
    error,
    profileNotFound,
    refetch,
  } = useJobSeekerProfile();

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your professional profile and career information.
            </p>
          </div>

          <div className="animate-pulse">

            <div className="h-64 rounded-3xl bg-slate-200" />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

              <div className="space-y-6">
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
              </div>

              <div className="space-y-6">
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="h-32 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
              </div>

            </div>

          </div>

        </div>
      </main>
    );
  }

  /* =========================================================
     REAL API ERROR
     
     IMPORTANT:
     profileNotFound is NOT an error.
     It means the user is logged in but has not created
     a job seeker profile yet.
  ========================================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your professional profile and career information.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">

            <h2 className="text-lg font-bold text-slate-950">
              Unable to load your profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw size={16} />

              Try Again
            </button>

          </div>

        </div>

      </main>
    );
  }

  /* =========================================================
     DISPLAY DATA
     
     If profile exists:
        use actual profile

     If profile doesn't exist:
        use empty/default values
     
     This allows the SAME UI layout to be displayed.
  ========================================================= */

  const displayProfile = profile ?? {
    id: 0,
    userId: 0,

    fullName: "",
    email: "",
    phone: "",
    professionalTitle: "",
    about: "",
    address: "",
    highestEducation: "",

    yearsOfExperience: 0,
    openToWork: false,

    profileImage: null,
    resume: null,

    skills: [],
    socialProfiles: [],

    createdAt: "",
    updatedAt: "",
  };

  /* =========================================================
     PROFILE PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your professional profile and career information.
          </p>

        </div>

        {/* =====================================================
            PROFILE HEADER
        ===================================================== */}

        <ProfileHeader
          profile={displayProfile}
          profileNotFound={profileNotFound}
        />

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ===================================================
              MAIN CONTENT
          =================================================== */}

          <div className="space-y-6">

            <AboutSection
              about={displayProfile.about}
            />

            <ExperienceSection
              yearsOfExperience={
                displayProfile.yearsOfExperience
              }
            />

            <EducationSection
              highestEducation={
                displayProfile.highestEducation
              }
            />

            <SkillsSection
              skills={displayProfile.skills}
            />

          </div>

          {/* ===================================================
              SIDEBAR
          =================================================== */}

          <aside className="space-y-6">

            <ContactCard
              email={displayProfile.email}
              phone={displayProfile.phone}
              address={displayProfile.address}
            />

            <SocialCard
              socialProfiles={
                displayProfile.socialProfiles
              }
            />

            <ResumeCard
              resume={displayProfile.resume}
            />

            <ProfileInfoCard
              openToWork={
                displayProfile.openToWork
              }
              createdAt={
                displayProfile.createdAt
              }
              updatedAt={
                displayProfile.updatedAt
              }
            />

          </aside>

        </div>

      </div>

    </main>
  );
}