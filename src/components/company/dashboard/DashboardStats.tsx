
"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";

import { useDashboardStatistics } from "@/hooks/useDashboardStatistics";

import { StatCard } from "./StatCard";

// ============================================================
// DASHBOARD STATS
// ============================================================

export function DashboardStats() {
  const {
    statistics,
    loading,
    error,
  } = useDashboardStatistics();


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Jobs"
          value="—"
          description="All job postings"
          icon={<BriefcaseBusiness size={20} />}
        />

        <StatCard
          title="Active Jobs"
          value="—"
          description="Currently accepting applications"
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Applications"
          value="—"
          description="Total applications received"
          icon={<FileText size={20} />}
        />

        <StatCard
          title="Job Seekers"
          value="—"
          description="Candidates in your pipeline"
          icon={<Users size={20} />}
        />

      </section>
    );
  }


  // ============================================================
  // ERROR / NO DATA
  // ============================================================

  if (error || !statistics) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Jobs"
          value="—"
          description="All job postings"
          icon={<BriefcaseBusiness size={20} />}
        />

        <StatCard
          title="Active Jobs"
          value="—"
          description="Currently accepting applications"
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Applications"
          value="—"
          description="Total applications received"
          icon={<FileText size={20} />}
        />

        <StatCard
          title="Job Seekers"
          value="—"
          description="Candidates in your pipeline"
          icon={<Users size={20} />}
        />

      </section>
    );
  }


  // ============================================================
  // SUCCESS
  // ============================================================

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* ======================================================
          TOTAL JOBS
      ====================================================== */}

      <StatCard
        title="Total Jobs"
        value={statistics.totalJobs.toLocaleString()}
        description="All job postings"
        icon={<BriefcaseBusiness size={20} />}
      />


      {/* ======================================================
          ACTIVE JOBS
      ====================================================== */}

      <StatCard
        title="Active Jobs"
        value={statistics.activeJobs.toLocaleString()}
        description="Currently accepting applications"
        icon={<CheckCircle2 size={20} />}
      />


      {/* ======================================================
          APPLICATIONS
      ====================================================== */}

      <StatCard
        title="Applications"
        value={statistics.applications.toLocaleString()}
        description="Total applications received"
        icon={<FileText size={20} />}
      />


      {/* ======================================================
          JOB SEEKERS
      ====================================================== */}

      <StatCard
        title="Job Seekers"
        value={statistics.candidatesInPipeline.toLocaleString()}
        description="Candidates in your pipeline"
        icon={<Users size={20} />}
      />

    </section>
  );
}
