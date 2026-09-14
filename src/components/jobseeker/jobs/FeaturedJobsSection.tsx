"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useFeaturedJobs } from "@/hooks/useFeaturedJobs";

import { JobCard } from "./JobCard";

export function FeaturedJobsSection() {
  const searchParams =
    useSearchParams();

  const search =
    searchParams.get(
      "keyword",
    ) ?? "";

  const location =
    searchParams.get(
      "location",
    ) ?? "";

  const {
    jobs,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    isJobSeeker,
    goToPage,
  } = useFeaturedJobs(
    0,
    20,
    search,
    location,
  );

  const hasSearch =
    search.trim() !== "" ||
    location.trim() !== "";

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {isJobSeeker
                ? "Personalized opportunities"
                : hasSearch
                  ? "Search results"
                  : "Latest opportunities"}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {isJobSeeker
                ? "Recommended jobs"
                : hasSearch
                  ? "Jobs matching your search"
                  : "Featured jobs"}
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              {isJobSeeker
                ? "Jobs recommended based on your skills, experience, and profile."
                : hasSearch
                  ? "Browse published jobs that match your keyword and location."
                  : "Explore the latest opportunities available on the platform."}
            </p>

            {hasSearch && (
              <div className="mt-4 flex flex-wrap gap-2">
                {search.trim() && (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                    Keyword: {search}
                  </span>
                )}

                {location.trim() && (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                    Location: {location}
                  </span>
                )}
              </div>
            )}
          </div>

          {!loading &&
            !error &&
            totalElements > 0 && (
              <p className="text-sm text-slate-500">
                Showing {jobs.length} of{" "}
                {totalElements} jobs
              </p>
            )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 flex min-h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Loader2
                size={20}
                className="animate-spin"
              />

              <span>
                {isJobSeeker
                  ? "Finding recommended jobs..."
                  : hasSearch
                    ? "Searching jobs..."
                    : "Loading jobs..."}
              </span>
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          jobs.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-500">
                {hasSearch
                  ? "No jobs matched your search. Try another keyword or location."
                  : isJobSeeker
                    ? "No recommended jobs are available right now."
                    : "No published jobs are available right now."}
              </p>
            </div>
          )}

        {/* JOBS */}
        {!loading &&
          !error &&
          jobs.length > 0 && (
            <>
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">

                  <p className="text-sm text-slate-500">
                    Page {page + 1} of{" "}
                    {totalPages}
                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      disabled={
                        page === 0 ||
                        loading
                      }
                      onClick={() =>
                        goToPage(
                          page - 1,
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <div className="hidden items-center gap-1 sm:flex">
                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (_, index) =>
                          index,
                      ).map(
                        (pageNumber) => {
                          const isActive =
                            pageNumber ===
                            page;

                          return (
                            <button
                              key={
                                pageNumber
                              }
                              type="button"
                              disabled={
                                loading
                              }
                              onClick={() =>
                                goToPage(
                                  pageNumber,
                                )
                              }
                              className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                isActive
                                  ? "bg-slate-950 text-white"
                                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                              } disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                              {pageNumber +
                                1}
                            </button>
                          );
                        },
                      )}
                    </div>

                    <span className="text-sm font-medium text-slate-700 sm:hidden">
                      {page + 1} /{" "}
                      {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={
                        page >=
                          totalPages - 1 ||
                        loading
                      }
                      onClick={() =>
                        goToPage(
                          page + 1,
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>

                  </div>
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
}