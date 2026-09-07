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

  salaryMin: string;

  salaryMax: string;

  applicationDeadline: string;

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

  salaryMin: "",

  salaryMax: "",

  applicationDeadline: "",

  jobType: "",

  jobLevel: "",

  responsibilities: [""],

  skills: [""],

  specifications: [""],
};


/*
|--------------------------------------------------------------------------
| Convert backend multiline text into array
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
| Convert backend datetime into datetime-local format
|--------------------------------------------------------------------------
|
| datetime-local expects:
|
| YYYY-MM-DDTHH:mm
|
| Backend may return:
|
| 2026-09-30T17:00:00
|
| or:
|
| 2026-09-30T17:00:00.000
|
|--------------------------------------------------------------------------
*/

function formatDateTimeLocal(
  value: string | null,
): string {
  if (!value) {
    return "";
  }

  return value.slice(0, 16);
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
      title:
        job.title ?? "",

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

      /*
      |--------------------------------------------------------------------------
      | Salary
      |--------------------------------------------------------------------------
      */

      salaryMin:
        job.salaryMin !== null &&
        job.salaryMin !== undefined
          ? String(job.salaryMin)
          : "",

      salaryMax:
        job.salaryMax !== null &&
        job.salaryMax !== undefined
          ? String(job.salaryMax)
          : "",

      /*
      |--------------------------------------------------------------------------
      | Application deadline
      |--------------------------------------------------------------------------
      */

      applicationDeadline:
        formatDateTimeLocal(
          job.applicationDeadline,
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

    const salaryMin =
      form.salaryMin.trim()
        ? Number(form.salaryMin)
        : null;

    const salaryMax =
      form.salaryMax.trim()
        ? Number(form.salaryMax)
        : null;

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


    /*
    |--------------------------------------------------------------------------
    | Basic validation
    |--------------------------------------------------------------------------
    */

    if (!title) {
      return "Job title is required.";
    }

    if (!description) {
      return "Job description is required.";
    }

    if (!location) {
      return "Job location is required.";
    }


    /*
    |--------------------------------------------------------------------------
    | Vacancy
    |--------------------------------------------------------------------------
    */

    if (
      !form.vacancy.trim() ||
      !Number.isInteger(vacancy) ||
      vacancy < 1
    ) {
      return "Vacancies must be at least 1.";
    }


    /*
    |--------------------------------------------------------------------------
    | Experience
    |--------------------------------------------------------------------------
    */

    if (
      !form.experience.trim() ||
      !Number.isInteger(experience) ||
      experience < 0
    ) {
      return "Experience must be zero or greater.";
    }


    /*
    |--------------------------------------------------------------------------
    | Education
    |--------------------------------------------------------------------------
    */

    if (!education) {
      return "Education requirement is required.";
    }


    /*
    |--------------------------------------------------------------------------
    | Salary
    |--------------------------------------------------------------------------
    */

    if (
      salaryMin !== null &&
      (!Number.isFinite(salaryMin) ||
        salaryMin < 0)
    ) {
      return "Minimum salary must be zero or greater.";
    }

    if (
      salaryMax !== null &&
      (!Number.isFinite(salaryMax) ||
        salaryMax < 0)
    ) {
      return "Maximum salary must be zero or greater.";
    }

    if (
      salaryMin !== null &&
      salaryMax !== null &&
      salaryMin > salaryMax
    ) {
      return "Minimum salary cannot be greater than maximum salary.";
    }


    /*
    |--------------------------------------------------------------------------
    | Job type
    |--------------------------------------------------------------------------
    */

    if (!form.jobType) {
      return "Please select a job type.";
    }


    /*
    |--------------------------------------------------------------------------
    | Job level
    |--------------------------------------------------------------------------
    */

    if (!form.jobLevel) {
      return "Please select a job level.";
    }


    /*
    |--------------------------------------------------------------------------
    | Application deadline
    |--------------------------------------------------------------------------
    */

    if (
      !form.applicationDeadline.trim()
    ) {
      return "Application deadline is required.";
    }

    const deadlineDate =
      new Date(
        form.applicationDeadline,
      );

    if (
      Number.isNaN(
        deadlineDate.getTime(),
      )
    ) {
      return "Please enter a valid application deadline.";
    }

    if (
      deadlineDate.getTime() <=
      Date.now()
    ) {
      return "Application deadline must be in the future.";
    }


    /*
    |--------------------------------------------------------------------------
    | Responsibilities
    |--------------------------------------------------------------------------
    */

    if (
      responsibilities.length === 0
    ) {
      return "Please add at least one responsibility.";
    }


    /*
    |--------------------------------------------------------------------------
    | Skills
    |--------------------------------------------------------------------------
    */

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

    const salaryMin =
      form.salaryMin.trim()
        ? Number(form.salaryMin)
        : null;

    const salaryMax =
      form.salaryMax.trim()
        ? Number(form.salaryMax)
        : null;

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

      /*
      |--------------------------------------------------------------------------
      | Salary
      |--------------------------------------------------------------------------
      */

      salaryMin,

      salaryMax,

      salaryCurrency:
        job.salaryCurrency ||
        "NPR",

      salaryNegotiable:
        job.salaryNegotiable ??
        false,

      /*
      |--------------------------------------------------------------------------
      | Job information
      |--------------------------------------------------------------------------
      */

      jobType:
        form.jobType,

      jobLevel:
        form.jobLevel,

      experienceRequired,

      educationRequired:
        education,

      vacancies:
        vacancy,

      /*
      |--------------------------------------------------------------------------
      | Application deadline
      |--------------------------------------------------------------------------
      |
      | Keep the datetime-local value as:
      |
      | 2026-09-30T17:00
      |
      | Do NOT use toISOString() here because
      | it can shift the time because of timezone conversion.
      |
      |--------------------------------------------------------------------------
      */

      applicationDeadline:
        form.applicationDeadline,

      featured:
        job.featured ??
        false,

      urgent:
        job.urgent ??
        false,

      /*
      |--------------------------------------------------------------------------
      | Required skills
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | Benefits
      |--------------------------------------------------------------------------
      */

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
            title={
              form.title
            }
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

            salaryMin={
              form.salaryMin
            }

            salaryMax={
              form.salaryMax
            }

            applicationDeadline={
              form.applicationDeadline
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