"use client";

import { useParams } from "next/navigation";

import { JobDetails } from "@/components/jobs/details/JobDetails";

export default function JobDetailsPage() {
  const params = useParams();

  const jobId = params.id;

  return <JobDetails jobId={String(jobId)} />;
}