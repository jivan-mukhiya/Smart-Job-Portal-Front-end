import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import { routes } from "@/config/routes";

export function CTASection() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">

      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center sm:px-10 sm:py-20">

        <div className="mx-auto max-w-2xl">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">

            <BriefcaseBusiness size={24} />

          </div>


          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to take the next step?
          </h2>


          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Join Smart Job Portal and discover a smarter way
            to find jobs or hire talented professionals.
          </p>


          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href={routes.jobs.all}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Find a Job

              <ArrowRight size={17} />
            </Link>


            <Link
              href={routes.auth.register}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Hire Talent
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}