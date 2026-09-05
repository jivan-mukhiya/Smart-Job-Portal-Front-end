import {
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FeatureCard } from "./components/FeatureCard";


export function FeaturesSection() {
  const features = [
    {
      icon: <Search size={24} />,
      title: "Find Better Opportunities",
      description:
        "Search for jobs based on your skills, experience, location, and career goals.",
    },

    {
      icon: <Users size={24} />,
      title: "Connect With Talent",
      description:
        "Companies can discover qualified professionals and build stronger teams.",
    },

    {
      icon: <ShieldCheck size={24} />,
      title: "Simple & Reliable",
      description:
        "Manage profiles, applications, jobs, and hiring activities from one platform.",
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Why Smart Job Portal
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need to move forward
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Simple tools designed to make finding jobs and
            hiring talent easier.
          </p>

        </div>


        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}