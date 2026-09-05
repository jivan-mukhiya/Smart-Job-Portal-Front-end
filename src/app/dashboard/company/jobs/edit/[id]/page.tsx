"use client";

import { useParams } from "next/navigation";

import { EditJobForm } from "@/components/company/jobs/Edit/EditJobForm";

export default function EditJobPage() {
  const params = useParams<{
    id?: string;
  }>();

  console.log("[EditJobPage] params:", params);

  const rawJobId = params?.id;

  console.log("[EditJobPage] raw jobId:", rawJobId);

  if (!rawJobId || rawJobId.trim() === "") {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Invalid Job ID
          </h2>

          <p className="mt-2 text-sm text-red-700">
            The requested job ID is missing from the URL.
          </p>

          <p className="mt-3 text-xs text-red-600">
            Current URL parameters:{" "}
            {JSON.stringify(params)}
          </p>
        </div>
      </div>
    );
  }

  const numericJobId = Number(rawJobId);

  console.log(
    "[EditJobPage] numeric jobId:",
    numericJobId,
  );

  if (
    !Number.isInteger(numericJobId) ||
    numericJobId <= 0
  ) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Invalid Job ID
          </h2>

          <p className="mt-2 text-sm text-red-700">
            The requested job ID is invalid.
          </p>

          <p className="mt-3 text-xs text-red-600">
            Received job ID: {rawJobId}
          </p>
        </div>
      </div>
    );
  }

  return <EditJobForm jobId={numericJobId} />;
}