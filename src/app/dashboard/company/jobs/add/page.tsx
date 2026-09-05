import { PostJobForm } from "@/components/company/jobs/Add/PostJobForm";

export default function AddJobPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Company Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Post a Job
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new job opportunity and find the right talent.
          </p>
        </div>

        <PostJobForm />

      </div>

    </main>
  );
}