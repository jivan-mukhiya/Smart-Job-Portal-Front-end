"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { routes } from "@/config/routes";

export function JobSearchSection() {
  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("");

  const handleSearch = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const params =
      new URLSearchParams();

    const trimmedKeyword =
      keyword.trim();

    const trimmedLocation =
      location.trim();

    if (trimmedKeyword) {
      params.set(
        "keyword",
        trimmedKeyword,
      );
    }

    if (trimmedLocation) {
      params.set(
        "location",
        trimmedLocation,
      );
    }

    const queryString =
      params.toString();

    window.location.href =
      queryString
        ? `${routes.jobs.all}?${queryString}`
        : routes.jobs.all;
  };

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="mx-auto max-w-3xl">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                  <BriefcaseBusiness
                    size={24}
                  />
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Find your next job
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  Search for jobs by title,
                  skill, keyword, or
                  location and discover
                  opportunities that match
                  your career goals.
                </p>
              </div>

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="mt-8 rounded-2xl bg-white p-2 shadow-xl"
              >
                <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  {/* Keyword */}
                  <Input
                    value={keyword}
                    onChange={(event) =>
                      setKeyword(
                        event.target.value,
                      )
                    }
                    placeholder="Job title, skill or keyword"
                    leftIcon={
                      <Search size={18} />
                    }
                    className="min-h-12 border-transparent bg-slate-50"
                    aria-label="Job title, skill or keyword"
                  />

                  {/* Location */}
                  <Input
                    value={location}
                    onChange={(event) =>
                      setLocation(
                        event.target.value,
                      )
                    }
                    placeholder="Location"
                    leftIcon={
                      <MapPin size={18} />
                    }
                    className="min-h-12 border-transparent bg-slate-50"
                    aria-label="Location"
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Search Jobs

                    <ArrowRight
                      size={17}
                    />
                  </button>
                </div>
              </form>

              {/* Quick Searches */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                <span className="mr-1 text-slate-400">
                  Popular searches:
                </span>

                <QuickSearch
                  label="Software Developer"
                  keyword="Software Developer"
                />

                <QuickSearch
                  label="Java Developer"
                  keyword="Java Developer"
                />

                <QuickSearch
                  label="UI/UX Designer"
                  keyword="UI/UX Designer"
                />

                <QuickSearch
                  label="Accountant"
                  keyword="Accountant"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface QuickSearchProps {
  label: string;
  keyword: string;
}

function QuickSearch({
  label,
  keyword,
}: QuickSearchProps) {
  return (
    <Link
      href={`${routes.jobs.all}?keyword=${encodeURIComponent(
        keyword,
      )}`}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      {label}
    </Link>
  );
}