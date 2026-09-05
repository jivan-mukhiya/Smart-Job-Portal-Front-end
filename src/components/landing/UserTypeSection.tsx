import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Users,
} from "lucide-react";

import { routes } from "@/config/routes";
import { Benefit } from "./components/Benefit";

export function UserTypeSection() {
  return (
    <section className="py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <SectionHeader
          eyebrow="One platform"
          title="Built for both sides of the job market"
          description="Whether you're searching for your next opportunity or searching for the right person, Smart Job Portal gives you the tools to move forward."
        />


        {/* Cards */}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">

          <JobSeekerCard />

          <CompanyCard />

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   JOB SEEKER
========================================================= */

function JobSeekerCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9">

      <CardIcon>
        <Users
          size={28}
          strokeWidth={1.8}
        />
      </CardIcon>


      <CardBadge>
        Job Seeker
      </CardBadge>


      <h3 className="mt-7 text-2xl font-bold text-slate-950">
        Looking for your next job?
      </h3>


      <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
        Create your professional profile, discover jobs that
        match your skills, and apply to opportunities with
        confidence.
      </p>


      <div className="mt-7 space-y-3">

        <Benefit text="Discover jobs that match your skills" />

        <Benefit text="Build your professional profile" />

        <Benefit text="Apply for jobs easily" />

      </div>


      <Link
        href={routes.auth.register}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Register as Job Seeker

        <ArrowRight size={17} />

      </Link>

    </div>
  );
}


/* =========================================================
   COMPANY
========================================================= */

function CompanyCard() {
  return (
    <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9">

      <CardIcon dark>
        <Building2
          size={28}
          strokeWidth={1.8}
        />
      </CardIcon>


      <CardBadge dark>
        Company
      </CardBadge>


      <h3 className="mt-7 text-2xl font-bold">
        Looking for great talent?
      </h3>


      <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
        Create your company profile, publish job openings,
        and connect with professionals who can help your
        business grow.
      </p>


      <div className="mt-7 space-y-3">

        <Benefit
          text="Post and manage job openings"
          dark
        />

        <Benefit
          text="Reach qualified professionals"
          dark
        />

        <Benefit
          text="Manage applications efficiently"
          dark
        />

      </div>


      <Link
        href={routes.auth.register}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
      >
        Register as Company

        <ArrowRight size={17} />

      </Link>

    </div>
  );
}


/* =========================================================
   CARD ICON
========================================================= */

function CardIcon({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white"
          : "flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-950"
      }
    >
      {children}
    </div>
  );
}


/* =========================================================
   CARD BADGE
========================================================= */

function CardBadge({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={
        dark
          ? "float-right -mt-14 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300"
          : "float-right -mt-14 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
      }
    >
      {children}
    </span>
  );
}