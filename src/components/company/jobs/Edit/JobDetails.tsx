"use client";

interface JobDetailsProps {
  vacancy: string;
  experience: string;
  education: string;
  salary: string;
  jobType: string;
  jobLevel: string;
  onChange: (
    field:
      | "vacancy"
      | "experience"
      | "education"
      | "salary"
      | "jobType"
      | "jobLevel",
    value: string,
  ) => void;
}

const JOB_TYPES = [
  {
    value: "FULL_TIME",
    label: "Full Time",
  },
  {
    value: "PART_TIME",
    label: "Part Time",
  },
  {
    value: "CONTRACT",
    label: "Contract",
  },
  {
    value: "FREELANCE",
    label: "Freelance",
  },
  {
    value: "INTERNSHIP",
    label: "Internship",
  },
  {
    value: "REMOTE",
    label: "Remote",
  },
  {
    value: "HYBRID",
    label: "Hybrid",
  },
];

const JOB_LEVELS = [
  {
    value: "ENTRY",
    label: "Entry Level",
  },
  {
    value: "MID",
    label: "Mid Level",
  },
  {
    value: "SENIOR",
    label: "Senior Level",
  },
  {
    value: "LEAD",
    label: "Lead",
  },
  {
    value: "MANAGER",
    label: "Manager",
  },
  {
    value: "DIRECTOR",
    label: "Director",
  },
  {
    value: "EXECUTIVE",
    label: "Executive",
  },
];

export function JobDetails({
  vacancy,
  experience,
  education,
  salary,
  jobType,
  jobLevel,
  onChange,
}: JobDetailsProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Job Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add employment, salary, and
          qualification details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Vacancies */}
        <div>
          <label
            htmlFor="job-vacancy"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Number of Vacancies
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="job-vacancy"
            type="number"
            min={1}
            step={1}
            value={vacancy}
            onChange={(event) =>
              onChange(
                "vacancy",
                event.target
                  .value,
              )
            }
            placeholder="e.g. 2"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="job-experience"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Experience Required
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="job-experience"
            type="number"
            min={0}
            step={1}
            value={experience}
            onChange={(event) =>
              onChange(
                "experience",
                event.target
                  .value,
              )
            }
            placeholder="Years of experience"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Education */}
        <div>
          <label
            htmlFor="job-education"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Education Requirement
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="job-education"
            type="text"
            value={education}
            onChange={(event) =>
              onChange(
                "education",
                event.target
                  .value,
              )
            }
            placeholder="e.g. Bachelor's degree in Computer Science"
            maxLength={255}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Salary */}
        <div>
          <label
            htmlFor="job-salary"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Salary Range
          </label>

          <input
            id="job-salary"
            type="text"
            value={salary}
            onChange={(event) =>
              onChange(
                "salary",
                event.target
                  .value,
              )
            }
            placeholder="e.g. NPR 40,000 - 70,000"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Job Type */}
        <div>
          <label
            htmlFor="job-type"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Job Type
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="job-type"
            value={jobType}
            onChange={(event) =>
              onChange(
                "jobType",
                event.target
                  .value,
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select job type
            </option>

            {JOB_TYPES.map(
              (type) => (
                <option
                  key={type.value}
                  value={
                    type.value
                  }
                >
                  {type.label}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Job Level */}
        <div>
          <label
            htmlFor="job-level"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Job Level
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="job-level"
            value={jobLevel}
            onChange={(event) =>
              onChange(
                "jobLevel",
                event.target
                  .value,
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select job level
            </option>

            {JOB_LEVELS.map(
              (level) => (
                <option
                  key={level.value}
                  value={
                    level.value
                  }
                >
                  {level.label}
                </option>
              ),
            )}
          </select>
        </div>
      </div>
    </section>
  );
}