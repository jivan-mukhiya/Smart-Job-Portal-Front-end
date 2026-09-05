"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Edit3,
  Eye,
  Plus,
} from "lucide-react";

import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h2 className="text-base font-bold text-slate-950">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your company&apos;s hiring activities.
        </p>
      </div>


      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <ActionButton
          icon={<Plus size={18} />}
          title="Post a Job"
          description="Create a new job"
          onClick={() => {
            router.push("/dashboard/company/jobs/add");
          }}
        />

        <ActionButton
          icon={<BriefcaseBusiness size={18} />}
          title="Manage Jobs"
          description="View your job postings"
          onClick={() => {
            router.push("/dashboard/company/jobs");
          }}
        />

        <ActionButton
          icon={<Eye size={18} />}
          title="Applications"
          description="Review candidates"
          onClick={() => {
            router.push("/dashboard/company/applications");
          }}
        />

        <ActionButton
          icon={<Edit3 size={18} />}
          title="Company Profile"
          description="Update company details"
          onClick={() => {
            router.push("/dashboard/company/profile/view");
          }}
        />

      </div>

    </section>
  );
}


interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}


function ActionButton({
  icon,
  title,
  description,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
    >

      {/* Icon */}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
        {icon}
      </div>


      {/* Content */}

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-slate-500">
          {description}
        </p>

      </div>


      {/* Arrow */}

      <ArrowRight
        size={15}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700"
      />

    </button>
  );
}