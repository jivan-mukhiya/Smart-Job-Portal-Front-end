import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { FormLabel } from "@/components/ui/FormLabel";

interface JobDetailsProps {
  form: {
    vacancy: string;
    experience: string;
    education: string;
    salary: string;
    jobType: string;
    jobLevel: string;
  };

  onChange: (
    field: string,
    value: string
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
  form,
  onChange,
}: JobDetailsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Layers3 size={19} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950">
            Job Details
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Define the position requirements and employment details.
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* Vacancies */}
        <div>
          <FormLabel
            htmlFor="vacancy"
            required
          >
            Number of Vacancies
          </FormLabel>

          <Input
            id="vacancy"
            name="vacancy"
            type="number"
            min={1}
            max={1000}
            value={form.vacancy}
            onChange={(e) =>
              onChange(
                "vacancy",
                e.target.value
              )
            }
            placeholder="e.g. 2"
            leftIcon={<Users size={17} />}
            required
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Maximum 1000 vacancies.
          </p>
        </div>

        {/* Experience */}
        <div>
          <FormLabel
            htmlFor="experience"
            required
          >
            Experience
          </FormLabel>

          <Input
            id="experience"
            name="experience"
            type="number"
            min={0}
            max={50}
            value={form.experience}
            onChange={(e) =>
              onChange(
                "experience",
                e.target.value
              )
            }
            placeholder="e.g. 2"
            rightElement={
              <span className="text-xs text-slate-400">
                years
              </span>
            }
            required
          />
        </div>

        {/* Education */}
        <div>
          <FormLabel
            htmlFor="education"
            required
          >
            Education
          </FormLabel>

          <Input
            id="education"
            name="education"
            value={form.education}
            onChange={(e) =>
              onChange(
                "education",
                e.target.value
              )
            }
            placeholder="e.g. Bachelor's in Computer Science"
            leftIcon={
              <GraduationCap size={17} />
            }
            required
          />
        </div>

        {/* Salary */}
        <div>
          <FormLabel htmlFor="salary">
            Salary
          </FormLabel>

          <Input
            id="salary"
            name="salary"
            value={form.salary}
            onChange={(e) =>
              onChange(
                "salary",
                e.target.value
              )
            }
            placeholder="e.g. NPR 40,000 - 70,000"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Example: NPR 40,000 - 70,000
          </p>
        </div>

        {/* Job Type */}
        <div>
          <FormLabel
            htmlFor="jobType"
            required
          >
            Job Type
          </FormLabel>

          <div className="relative">
            <Briefcase
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <select
              id="jobType"
              name="jobType"
              value={form.jobType}
              onChange={(e) =>
                onChange(
                  "jobType",
                  e.target.value
                )
              }
              required
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="" disabled>
                Select job type
              </option>

              {JOB_TYPES.map((jobType) => (
                <option
                  key={jobType.value}
                  value={jobType.value}
                >
                  {jobType.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <p className="mt-1.5 text-xs text-slate-400">
            Select the employment type for this position.
          </p>
        </div>

        {/* Job Level */}
        <div>
          <FormLabel
            htmlFor="jobLevel"
            required
          >
            Job Level
          </FormLabel>

          <div className="relative">
            <Layers3
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <select
              id="jobLevel"
              name="jobLevel"
              value={form.jobLevel}
              onChange={(e) =>
                onChange(
                  "jobLevel",
                  e.target.value
                )
              }
              required
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="" disabled>
                Select job level
              </option>

              {JOB_LEVELS.map((jobLevel) => (
                <option
                  key={jobLevel.value}
                  value={jobLevel.value}
                >
                  {jobLevel.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <p className="mt-1.5 text-xs text-slate-400">
            Select the seniority level for this position.
          </p>
        </div>
      </div>
    </section>
  );
}