"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import { ApiError } from "@/lib/api-error";

import { routes } from "@/config/routes";

import { useJob } from "@/hooks/useJob";

import { jobService } from "@/services/job.service";

import type { JobRequest } from "@/types/job";
import { JobBasicInfo } from "./JobBasicInfo";
import { JobDetails } from "./JobDetails";
import { JobRequirements } from "./JobRequirements";



/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

interface EditJobFormProps {
  jobId: number;
}


/*
|--------------------------------------------------------------------------
| Form state
|--------------------------------------------------------------------------
*/

interface EditJobFormState {
  title: string;

  description: string;

  vacancy: string;

  location: string;

  experience: string;

  education: string;

  salary: string;

  jobType: string;

  jobLevel: string;

  responsibilities: string[];

  skills: string[];

  specifications: string[];
}


/*
|--------------------------------------------------------------------------
| Initial form
|--------------------------------------------------------------------------
*/

const initialForm: EditJobFormState = {
  title: "",

  description: "",

  vacancy: "",

  location: "",

  experience: "",

  education: "",

  salary: "",

  jobType: "",

  jobLevel: "",

  responsibilities: [""],

  skills: [""],

  specifications: [""],
};


/*
|--------------------------------------------------------------------------
| Format salary for display
|--------------------------------------------------------------------------
*/

function formatSalary(
  salaryMin: number | null,
  salaryMax: number | null,
  currency: string | null,
): string {
  if (
    salaryMin === null &&
    salaryMax === null
  ) {
    return "";
  }

  const currencyValue =
    currency?.trim() || "NPR";

  if (
    salaryMin !== null &&
    salaryMax !== null
  ) {
    if (
      salaryMin === salaryMax
    ) {
      return `${currencyValue} ${salaryMin.toLocaleString()}`;
    }

    return `${currencyValue} ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}`;
  }

  if (salaryMin !== null) {
    return `${currencyValue} ${salaryMin.toLocaleString()}`;
  }

  if (salaryMax !== null) {
    return `${currencyValue} ${salaryMax.toLocaleString()}`;
  }

  return "";
}


/*
|--------------------------------------------------------------------------
| Convert multiline backend text into array
|--------------------------------------------------------------------------
*/

function splitLines(
  value: string | null,
): string[] {
  if (!value) {
    return [""];
  }

  const items = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0
    ? items
    : [""];
}


/*
|--------------------------------------------------------------------------
| Parse salary string
|--------------------------------------------------------------------------
|
| Examples:
|
| NPR 40,000 - 70,000
|       ↓
| salaryMin = 40000
| salaryMax = 70000
|
| NPR 50,000
|       ↓
| salaryMin = 50000
| salaryMax = 50000
|
|--------------------------------------------------------------------------
*/

function parseSalaryRange(
  value: string,
): {
  salaryMin: number | null;

  salaryMax: number | null;
} {
  const numbers = value
    .replace(/,/g, "")
    .match(/\d+(?:\.\d+)?/g);

  if (
    !numbers ||
    numbers.length === 0
  ) {
    return {
      salaryMin: null,
      salaryMax: null,
    };
  }

  const parsed = numbers
    .map(Number)
    .filter(Number.isFinite);

  if (parsed.length === 1) {
    return {
      salaryMin: parsed[0],
      salaryMax: parsed[0],
    };
  }

  return {
    salaryMin: parsed[0],
    salaryMax: parsed[1],
  };
}


/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export function EditJobForm({
  jobId,
}: EditJobFormProps) {
  const router = useRouter();


  /*
  |--------------------------------------------------------------------------
  | Load job
  |--------------------------------------------------------------------------
  */

  const {
    job,
    loading: jobLoading,
    error: jobError,
  } = useJob(jobId);


  /*
  |--------------------------------------------------------------------------
  | Form state
  |--------------------------------------------------------------------------
  */

  const [form, setForm] =
    useState<EditJobFormState>(
      initialForm,
    );


  /*
  |--------------------------------------------------------------------------
  | Submit loading
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | Form initialized
  |--------------------------------------------------------------------------
  */

  const [initialized, setInitialized] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | Populate form when job loads
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!job) {
      return;
    }

    setForm({
      title: job.title ?? "",

      description:
        job.description ?? "",

      vacancy:
        job.vacancies !== null &&
        job.vacancies !== undefined
          ? String(job.vacancies)
          : "",

      location:
        job.location ?? "",

      experience:
        job.experienceRequired !== null &&
        job.experienceRequired !== undefined
          ? String(
              job.experienceRequired,
            )
          : "",

      education:
        job.educationRequired ?? "",

      salary: formatSalary(
        job.salaryMin,
        job.salaryMax,
        job.salaryCurrency,
      ),

      jobType:
        job.jobType ?? "",

      jobLevel:
        job.jobLevel ?? "",

      responsibilities:
        splitLines(
          job.responsibilities,
        ),

      skills:
        job.requiredSkills &&
        job.requiredSkills.length > 0
          ? job.requiredSkills
              .slice()
              .sort(
                (a, b) =>
                  (a.displayOrder ?? 0) -
                  (b.displayOrder ?? 0),
              )
              .map(
                (skill) =>
                  skill.skillName,
              )
              .filter(Boolean)
          : [""],

      specifications:
        splitLines(
          job.requirements,
        ),
    });

    setInitialized(true);
  }, [job]);


  /*
  |--------------------------------------------------------------------------
  | Update normal field
  |--------------------------------------------------------------------------
  */

  function updateField(
    field: keyof EditJobFormState,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  }


  /*
  |--------------------------------------------------------------------------
  | Update array field
  |--------------------------------------------------------------------------
  */

  function updateArrayField(
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
    index: number,
    value: string,
  ) {
    setForm((previous) => {
      const items = [
        ...previous[field],
      ];

      items[index] = value;

      return {
        ...previous,

        [field]: items,
      };
    });
  }


  /*
  |--------------------------------------------------------------------------
  | Add array item
  |--------------------------------------------------------------------------
  */

  function addArrayItem(
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
  ) {
    setForm((previous) => ({
      ...previous,

      [field]: [
        ...previous[field],

        "",
      ],
    }));
  }


  /*
  |--------------------------------------------------------------------------
  | Remove array item
  |--------------------------------------------------------------------------
  */

  function removeArrayItem(
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
    index: number,
  ) {
    setForm((previous) => {
      const items =
        previous[field].filter(
          (_, itemIndex) =>
            itemIndex !== index,
        );

      return {
        ...previous,

        [field]:
          items.length > 0
            ? items
            : [""],
      };
    });
  }


  /*
  |--------------------------------------------------------------------------
  | Validate form
  |--------------------------------------------------------------------------
  */

  function validateForm(): string | null {
    const title =
      form.title.trim();

    const description =
      form.description.trim();

    const location =
      form.location.trim();

    const education =
      form.education.trim();

    const vacancy =
      Number(form.vacancy);

    const experience =
      Number(form.experience);

    const responsibilities =
      form.responsibilities
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);

    const skills =
      form.skills
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);


    if (!title) {
      return "Job title is required.";
    }

    if (!description) {
      return "Job description is required.";
    }

    if (!location) {
      return "Job location is required.";
    }

    if (
      !form.vacancy.trim() ||
      !Number.isInteger(vacancy) ||
      vacancy < 1
    ) {
      return "Vacancies must be at least 1.";
    }

    if (
      !form.experience.trim() ||
      !Number.isInteger(experience) ||
      experience < 0
    ) {
      return "Experience must be zero or greater.";
    }

    if (!education) {
      return "Education requirement is required.";
    }

    if (!form.jobType) {
      return "Please select a job type.";
    }

    if (!form.jobLevel) {
      return "Please select a job level.";
    }

    if (
      responsibilities.length === 0
    ) {
      return "Please add at least one responsibility.";
    }

    if (
      skills.length === 0
    ) {
      return "Please add at least one skill.";
    }

    return null;
  }


  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();


    /*
    |--------------------------------------------------------------------------
    | Make sure job exists
    |--------------------------------------------------------------------------
    */

    if (!job) {
      toast.error(
        "Job information is not available.",
      );

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | Validate
    |--------------------------------------------------------------------------
    */

    const validationError =
      validateForm();

    if (validationError) {
      toast.error(
        validationError,
      );

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | Prepare values
    |--------------------------------------------------------------------------
    */

    const title =
      form.title.trim();

    const description =
      form.description.trim();

    const location =
      form.location.trim();

    const education =
      form.education.trim();

    const vacancy =
      Number(form.vacancy);

    const experienceRequired =
      Number(form.experience);

    const responsibilities =
      form.responsibilities
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);

    const skills =
      form.skills
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);

    const specifications =
      form.specifications
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);


    /*
    |--------------------------------------------------------------------------
    | Salary
    |--------------------------------------------------------------------------
    */

    const {
      salaryMin,
      salaryMax,
    } = parseSalaryRange(
      form.salary,
    );


    /*
    |--------------------------------------------------------------------------
    | Request payload
    |--------------------------------------------------------------------------
    */

    const payload: JobRequest = {
      title,

      description,

      responsibilities:
        responsibilities.join(
          "\n",
        ),

      requirements:
        specifications.join(
          "\n",
        ),

      location,

      address:
        job.address ?? null,

      salaryMin,

      salaryMax,

      salaryCurrency:
        job.salaryCurrency ||
        "NPR",

      salaryNegotiable:
        job.salaryNegotiable ??
        false,

      jobType:
        form.jobType,

      jobLevel:
        form.jobLevel,

      experienceRequired,

      educationRequired:
        education,

      vacancies:
        vacancy,

      applicationDeadline:
        job.applicationDeadline ??
        null,

      featured:
        job.featured ??
        false,

      urgent:
        job.urgent ??
        false,

      requiredSkills:
        skills.map(
          (
            skill,
            index,
          ) => ({
            skillName:
              skill,

            required:
              true,

            displayOrder:
              index,
          }),
        ),

      benefits:
        (
          job.benefits ??
          []
        ).map(
          (
            benefit,
            index,
          ) => ({
            benefitName:
              benefit.benefitName,

            description:
              benefit.description,

            displayOrder:
              benefit.displayOrder ??
              index,
          }),
        ),
    };


    /*
    |--------------------------------------------------------------------------
    | Update API
    |--------------------------------------------------------------------------
    */

    try {
      setLoading(true);

      console.log(
        "[EditJobForm] updating job:",
        job.id,
      );

      console.log(
        "[EditJobForm] payload:",
        payload,
      );

      const response =
        await jobService.updateJob(
          job.id,
          payload,
        );

      console.log(
        "[EditJobForm] update response:",
        response,
      );

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to update job.",
        );
      }

      toast.success(
        response.message ||
          "Job updated successfully.",
      );

      router.push(
        routes.company.jobs.all,
      );

      router.refresh();
    } catch (
      error: unknown
    ) {
      let message =
        "Failed to update job.";

      if (
        error instanceof ApiError
      ) {
        message =
          error.message;
      } else if (
        error instanceof Error
      ) {
        message =
          error.message;
      }

      console.error(
        "Failed to update job:",
        error,
      );

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (jobLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="space-y-5">
              <div className="h-10 rounded bg-gray-100" />

              <div className="h-32 rounded bg-gray-100" />

              <div className="h-10 rounded bg-gray-100" />

              <div className="h-10 rounded bg-gray-100" />

              <div className="h-10 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | API error
  |--------------------------------------------------------------------------
  */

  if (jobError) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Unable to load job
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {jobError}
          </p>

          <div className="mt-5 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push(
                  routes.company.jobs.all,
                )
              }
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Jobs
            </Button>
          </div>
        </div>
      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Job missing
  |--------------------------------------------------------------------------
  */

  if (
    !job ||
    !initialized
  ) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Job not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The requested job could not be found.
          </p>

          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push(
                  routes.company.jobs.all,
                )
              }
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Jobs
            </Button>
          </div>
        </div>
      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() =>
                router.push(
                  routes.company.jobs.all,
                )
              }
              className="mb-3 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Jobs
            </button>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Edit Job
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your job posting information.
            </p>
          </div>
        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Basic Information */}

          <JobBasicInfo
            title={form.title}
            description={
              form.description
            }
            location={
              form.location
            }
            onChange={(
              field,
              value,
            ) =>
              updateField(
                field,
                value,
              )
            }
          />


          {/* Job Details */}

          <JobDetails
            vacancy={
              form.vacancy
            }
            experience={
              form.experience
            }
            education={
              form.education
            }
            salary={
              form.salary
            }
            jobType={
              form.jobType
            }
            jobLevel={
              form.jobLevel
            }
            onChange={(
              field,
              value,
            ) =>
              updateField(
                field,
                value,
              )
            }
          />


          {/* Requirements */}

          <JobRequirements
            responsibilities={
              form.responsibilities
            }
            skills={
              form.skills
            }
            specifications={
              form.specifications
            }
            onChange={
              updateArrayField
            }
            onAdd={
              addArrayItem
            }
            onRemove={
              removeArrayItem
            }
          />


          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() =>
                router.push(
                  routes.company.jobs.all,
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />

              {loading
                ? "Updating..."
                : "Update Job"}
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
}