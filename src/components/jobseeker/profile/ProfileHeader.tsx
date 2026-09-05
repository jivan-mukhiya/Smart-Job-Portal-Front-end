"use client";

import {
  CheckCircle2,
  Edit3,
  MapPin,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/config/routes";

import type {
  JobSeekerProfile,
} from "@/types/jobseeker";

interface ProfileHeaderProps {
  profile: JobSeekerProfile;
}

export function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push(
      routes.jobseeker.profile.edit
    );
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

      {/* COVER */}

      <div className="h-32 bg-slate-950 sm:h-40" />


      {/* PROFILE CONTENT */}

      <div className="px-6 pb-7 sm:px-8">

        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

          {/* PROFILE INFORMATION */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

            {/* Avatar */}

            <ProfileAvatar
  name={profile.fullName}
  src={profile.profileImage?.imageUrl || undefined}
  size="xl"
/>


            {/* Information */}

            <div className="pb-1">

              <div className="flex items-center gap-2">

                <h2 className="text-2xl font-bold text-white">
                  {profile.fullName}
                </h2>

                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />

              </div>


              <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                {profile.professionalTitle ||
                  "Job Seeker"}
              </p>


              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">

                <MapPin size={15} />

                {profile.address ||
                  "Location not provided"}

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap items-center gap-3">

            <StatusBadge
              status={
                profile.openToWork
                  ? "OPEN_TO_WORK"
                  : "NOT_OPEN_TO_WORK"
              }
            />


            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={
                <Edit3 size={16} />
              }
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}