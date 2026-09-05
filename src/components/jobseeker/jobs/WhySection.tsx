import { Building2, Search, ShieldCheck } from "lucide-react";

import { FeatureCard } from "@/components/jobseeker/jobs/FeatureCard";

export function WhySection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Why Smart Job Portal
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A simpler way to find your next opportunity
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Everything you need to discover jobs and take control of your
            career.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Search size={24} />}
            title="Search smarter"
            description="Find jobs using keywords, skills, location, experience and other useful filters."
          />

          <FeatureCard
            icon={<Building2 size={24} />}
            title="Discover companies"
            description="Explore companies and learn more about the organizations behind the opportunities."
          />

          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="Build your career"
            description="Create your professional profile and present your skills to potential employers."
          />
        </div>
      </div>
    </section>
  );
}