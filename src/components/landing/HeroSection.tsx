
"use client";

import Link from "next/link";

import {
  ArrowRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

import { routes } from "@/config/routes";

import { useDashboardStatistics } from "@/hooks/useDashboardStatistics";

import { Stat } from "./components/Stat";


// ============================================================
// HERO SECTION
// ============================================================

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* Background decoration */}

      <HeroBackground />


      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">

        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:text-sm">

            <Sparkles
              size={15}
              className="text-slate-700"
            />

            Smart way to find your next opportunity

          </div>


          {/* Heading */}

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">

            Find the right job.

            <br />

            <span className="text-slate-500">
              Build your future.
            </span>

          </h1>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">

            Discover meaningful career opportunities or find
            talented professionals who can help your company
            grow.

          </p>


          {/* Search */}

          <JobSearch />


          {/* Popular searches */}

          <PopularSearches />

        </div>


        {/* Statistics */}

        <HeroStats />

      </div>

    </section>
  );
}


// ============================================================
// BACKGROUND
// ============================================================

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">

      <div className="absolute left-1/2 top-[-180px] h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-slate-200/50 blur-3xl" />

      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-slate-200/40 blur-3xl" />

      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-slate-200/40 blur-3xl" />

    </div>
  );
}


// ============================================================
// JOB SEARCH
// ============================================================

function JobSearch() {
  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50">

      <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">

        {/* Keyword */}

        <SearchInput
          icon={<Search size={20} />}
          placeholder="Job title, skill or keyword"
        />


        {/* Location */}

        <SearchInput
          icon={<MapPin size={20} />}
          placeholder="Location"
        />


        {/* Button */}

        <Link
          href={routes.jobs.all}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search Jobs

          <ArrowRight size={17} />
        </Link>

      </div>

    </div>
  );
}


// ============================================================
// SEARCH INPUT
// ============================================================

function SearchInput({
  icon,
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 transition focus-within:border-slate-200 focus-within:bg-slate-50">

      <span className="shrink-0 text-slate-400">
        {icon}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />

    </div>
  );
}


// ============================================================
// POPULAR SEARCHES
// ============================================================

function PopularSearches() {
  const searches = [
    "Software Developer",
    "UI/UX Designer",
    "Accountant",
    "Marketing",
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:text-sm">

      <span>
        Popular searches:
      </span>

      {searches.map((search) => (
        <Link
          key={search}
          href={routes.jobs.all}
          className="font-medium text-slate-700 hover:text-slate-950"
        >
          {search}
        </Link>
      ))}

    </div>
  );
}


// ============================================================
// HERO STATS
// ============================================================

function HeroStats() {

  const {
    statistics,
    loading,
    error,
  } = useDashboardStatistics();


  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 py-6 sm:grid-cols-3">

        <Stat
          value="—"
          label="Job Opportunities"
        />

        <Stat
          value="—"
          label="Companies"
        />

        <div className="col-span-2 mt-6 sm:col-span-1 sm:mt-0">

          <Stat
            value="—"
            label="Job Seekers"
          />

        </div>

      </div>
    );
  }


  // ============================================================
  // ERROR / NO DATA
  // ============================================================

  if (error || !statistics) {
    return (
      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 py-6 sm:grid-cols-3">

        <Stat
          value="0+"
          label="Job Opportunities"
        />

        <Stat
          value="0+"
          label="Companies"
        />

        <div className="col-span-2 mt-6 sm:col-span-1 sm:mt-0">

          <Stat
            value="0+"
            label="Job Seekers"
          />

        </div>

      </div>
    );
  }


  // ============================================================
  // SUCCESS
  // ============================================================

  return (
    <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 py-6 sm:grid-cols-3">

      {/* Job Opportunities */}

      <Stat
        value={`${statistics.jobOpportunities.toLocaleString()}+`}
        label="Job Opportunities"
      />


      {/* Companies */}

      <Stat
        value={`${statistics.companies.toLocaleString()}+`}
        label="Companies"
      />


      {/* Job Seekers */}

      <div className="col-span-2 mt-6 sm:col-span-1 sm:mt-0">

        <Stat
          value={`${statistics.jobSeekers.toLocaleString()}+`}
          label="Job Seekers"
        />

      </div>

    </div>
  );
}

