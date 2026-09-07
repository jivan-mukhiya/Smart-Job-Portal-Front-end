"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Save,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import { routes } from "@/config/routes";

import { ApiError } from "@/lib/api-error";

import { jobService } from "@/services/job.service";

import type {
  JobRequest,
} from "@/types/job";

import { JobBasicInfo } from "./JobBasicInfo";
import { JobDetails } from "./JobDetails";
import { JobRequirements } from "./JobRequirements";

type ArrayField =
  | "responsibilities"
  | "skills"
  | "specifications";

interface PostJobFormState {
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

export function PostJobForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<PostJobFormState>({
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
    });

  // ==========================================================
  // UPDATE BASIC FIELD
  // ==========================================================

  function updateField(
    field: string,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // ==========================================================
  // UPDATE ARRAY FIELD
  // ==========================================================

  function updateArrayField(
    field: ArrayField,
    index: number,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,

      [field]: previous[field].map(
        (item, itemIndex) =>
          itemIndex === index
            ? value
            : item,
      ),
    }));
  }

  // ==========================================================
  // ADD ARRAY ITEM
  // ==========================================================

  function addArrayItem(
    field: ArrayField,
  ) {
    setForm((previous) => ({
      ...previous,

      [field]: [
        ...previous[field],
        "",
      ],
    }));
  }

  // ==========================================================
  // REMOVE ARRAY ITEM
  // ==========================================================

  function removeArrayItem(
    field: ArrayField,
    index: number,
  ) {
    setForm((previous) => {
      const updated =
        previous[field].filter(
          (_, itemIndex) =>
            itemIndex !== index,
        );

      return {
        ...previous,

        [field]:
          updated.length > 0
            ? updated
            : [""],
      };
    });
  }

  // ==========================================================
  // VALIDATE FORM
  // ==========================================================

  function validateForm(): boolean {
    if (!form.title.trim()) {
      toast.error(
        "Job title is required.",
      );

      return false;
    }

    if (!form.description.trim()) {
      toast.error(
        "Job description is required.",
      );

      return false;
    }

    if (!form.location.trim()) {
      toast.error(
        "Location is required.",
      );

      return false;
    }

    const vacancies =
      Number(form.vacancy);

    if (
      !Number.isInteger(vacancies) ||
      vacancies <= 0
    ) {
      toast.error(
        "Number of vacancies must be greater than zero.",
      );

      return false;
    }

    const experience =
      Number(form.experience);

    if (
      !Number.isInteger(experience) ||
      experience < 0
    ) {
      toast.error(
        "Experience must be zero or greater.",
      );

      return false;
    }

    if (!form.education.trim()) {
      toast.error(
        "Education requirement is required.",
      );

      return false;
    }

    if (!form.jobType.trim()) {
      toast.error(
        "Job type is required.",
      );

      return false;
    }

    if (!form.jobLevel.trim()) {
      toast.error(
        "Job level is required.",
      );

      return false;
    }

    // ========================================================
    // SALARY VALIDATION
    // ========================================================

    const salaryMin =
      form.salaryMin.trim()
        ? Number(form.salaryMin)
        : null;

    const salaryMax =
      form.salaryMax.trim()
        ? Number(form.salaryMax)
        : null;

    if (
      salaryMin !== null &&
      (!Number.isFinite(salaryMin) ||
        salaryMin < 0)
    ) {
      toast.error(
        "Minimum salary must be zero or greater.",
      );

      return false;
    }

    if (
      salaryMax !== null &&
      (!Number.isFinite(salaryMax) ||
        salaryMax < 0)
    ) {
      toast.error(
        "Maximum salary must be zero or greater.",
      );

      return false;
    }

    if (
      salaryMin !== null &&
      salaryMax !== null &&
      salaryMin > salaryMax
    ) {
      toast.error(
        "Minimum salary cannot be greater than maximum salary.",
      );

      return false;
    }

    // ========================================================
    // APPLICATION DEADLINE
    // ========================================================

    if (!form.applicationDeadline) {
      toast.error(
        "Application deadline is required.",
      );

      return false;
    }

    const deadline =
      new Date(
        form.applicationDeadline,
      );

    if (
      Number.isNaN(
        deadline.getTime(),
      )
    ) {
      toast.error(
        "Please provide a valid application deadline.",
      );

      return false;
    }

    if (
      deadline.getTime() <=
      Date.now()
    ) {
      toast.error(
        "Application deadline must be in the future.",
      );

      return false;
    }

    // ========================================================
    // RESPONSIBILITIES
    // ========================================================

    const responsibilities =
      form.responsibilities.filter(
        (item) =>
          item.trim() !== "",
      );

    if (
      responsibilities.length ===
      0
    ) {
      toast.error(
        "Please add at least one responsibility.",
      );

      return false;
    }

    // ========================================================
    // SKILLS
    // ========================================================

    const skills =
      form.skills.filter(
        (item) =>
          item.trim() !== "",
      );

    if (skills.length === 0) {
      toast.error(
        "Please add at least one skill.",
      );

      return false;
    }

    return true;
  }

  // ==========================================================
  // NORMALIZE ENUM
  // ==========================================================

  function normalizeEnum(
    value: string,
  ): string {
    return value
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_");
  }

  // ==========================================================
  // CREATE API PAYLOAD
  // ==========================================================

  function buildPayload(): JobRequest {
    const responsibilities =
      form.responsibilities
        .filter(
          (item) =>
            item.trim() !== "",
        )
        .map((item) =>
          item.trim(),
        );

    const skills =
      form.skills
        .filter(
          (item) =>
            item.trim() !== "",
        )
        .map((skill, index) => ({
          skillName:
            skill.trim(),

          required: true,

          displayOrder: index,
        }));

    const specifications =
      form.specifications
        .filter(
          (item) =>
            item.trim() !== "",
        )
        .map((item) =>
          item.trim(),
        );

    // ========================================================
    // SALARY
    // ========================================================

    const salaryMin =
      form.salaryMin.trim()
        ? Number(form.salaryMin)
        : null;

    const salaryMax =
      form.salaryMax.trim()
        ? Number(form.salaryMax)
        : null;

    // ========================================================
    // APPLICATION DEADLINE
    //
    // datetime-local already produces:
    // YYYY-MM-DDTHH:mm
    //
    // Spring LocalDateTime accepts this format.
    // Do NOT convert it to ISO with Z because that
    // introduces timezone conversion.
    // ========================================================

    const applicationDeadline =
      form.applicationDeadline
        ? form.applicationDeadline
        : null;

    const payload =
      {
        title:
          form.title.trim(),

        description:
          form.description.trim(),

        responsibilities:
          responsibilities.join(
            "\n",
          ),

        requirements:
          specifications.length > 0
            ? specifications.join(
                "\n",
              )
            : null,

        location:
          form.location.trim(),

        address: null,

        salaryMin,

        salaryMax,

        salaryCurrency: "NPR",

        salaryNegotiable: false,

        jobType:
          normalizeEnum(
            form.jobType,
          ),

        jobLevel:
          normalizeEnum(
            form.jobLevel,
          ),

        experienceRequired:
          Number(form.experience),

        educationRequired:
          form.education.trim(),

        vacancies:
          Number(form.vacancy),

        applicationDeadline,

        featured: false,

        urgent: false,

        requiredSkills:
          skills,

        benefits: [],
      } as JobRequest;

    return payload;
  }

  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const isValid =
      validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const payload =
        buildPayload();

      console.log(
        "POST /jobs payload:",
        JSON.stringify(
          payload,
          null,
          2,
        ),
      );

      const response =
        await jobService.createJob(
          payload,
        );

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to create job.",
        );
      }

      toast.success(
        response.message ||
          "Job created successfully.",
      );

      router.push(
        routes.company.jobs.all,
      );

      router.refresh();
    } catch (error: unknown) {
      console.error(
        "Failed to create job:",
        error,
      );

      let message =
        "Failed to create job.";

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

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* BASIC INFORMATION */}

      <JobBasicInfo
        form={{
          title: form.title,

          description:
            form.description,

          location:
            form.location,
        }}
        onChange={
          updateField
        }
      />

      {/* JOB DETAILS */}

      <JobDetails
        form={{
          vacancy:
            form.vacancy,

          experience:
            form.experience,

          education:
            form.education,

          salaryMin:
            form.salaryMin,

          salaryMax:
            form.salaryMax,

          applicationDeadline:
            form.applicationDeadline,

          jobType:
            form.jobType,

          jobLevel:
            form.jobLevel,
        }}
        onChange={
          updateField
        }
      />

      {/* REQUIREMENTS */}

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

      {/* API INFORMATION */}

      <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2
          size={19}
          className="mt-0.5 shrink-0 text-emerald-600"
        />

        <div>
          <p className="text-sm font-semibold text-emerald-900">
            Ready to post
          </p>

          <p className="mt-1 text-xs leading-5 text-emerald-700">
            Your job will be submitted to the job portal and associated with your company account.
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <Button
          type="button"
          variant="ghost"
          leftIcon={
            <ArrowLeft
              size={17}
            />
          }
          onClick={() =>
            router.back()
          }
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          size="lg"
          loading={loading}
          disabled={loading}
          leftIcon={
            loading ? (
              undefined
            ) : (
              <Save
                size={17}
              />
            )
          }
        >
          {loading
            ? "Posting Job..."
            : "Post Job"}
        </Button>
      </div>
    </form>
  );
}