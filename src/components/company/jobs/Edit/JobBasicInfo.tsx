"use client";

interface JobBasicInfoProps {
  title: string;
  description: string;
  location: string;

  onChange: (
    field:
      | "title"
      | "description"
      | "location",
    value: string,
  ) => void;
}

export function JobBasicInfo({
  title,
  description,
  location,
  onChange,
}: JobBasicInfoProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Provide the basic information
          about this job.
        </p>
      </div>

      <div className="space-y-5">
        {/* Job Title */}
        <div>
          <label
            htmlFor="job-title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Job Title
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="job-title"
            type="text"
            value={title}
            onChange={(event) =>
              onChange(
                "title",
                event.target.value,
              )
            }
            placeholder="e.g. Senior Java Developer"
            maxLength={200}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="job-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Job Description
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <textarea
            id="job-description"
            value={description}
            onChange={(event) =>
              onChange(
                "description",
                event.target.value,
              )
            }
            placeholder="Describe the role, responsibilities, and what the successful candidate will do..."
            rows={6}
            maxLength={10000}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-right text-xs text-gray-400">
            {description.length}/10000
          </p>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="job-location"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Location
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="job-location"
            type="text"
            value={location}
            onChange={(event) =>
              onChange(
                "location",
                event.target.value,
              )
            }
            placeholder="e.g. Kathmandu, Nepal"
            maxLength={255}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </section>
  );
}