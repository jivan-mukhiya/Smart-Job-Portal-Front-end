"use client";

import {
  CheckCircle2,
  ListChecks,
} from "lucide-react";

import { DynamicListField } from "./DynamicListField";

interface JobRequirementsProps {
  responsibilities: string[];

  skills: string[];

  specifications: string[];

  onChange: (
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
    index: number,
    value: string,
  ) => void;

  onAdd: (
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
  ) => void;

  onRemove: (
    field:
      | "responsibilities"
      | "skills"
      | "specifications",
    index: number,
  ) => void;
}

export function JobRequirements({
  responsibilities,
  skills,
  specifications,
  onChange,
  onAdd,
  onRemove,
}: JobRequirementsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      {/* Header */}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <ListChecks size={19} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950">
            Requirements
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add the responsibilities, skills, and specifications for this position.
          </p>
        </div>
      </div>

      {/* Fields */}

      <div className="mt-7 space-y-8">
        {/* Responsibilities */}

        <DynamicListField
          label="Responsibilities"
          description="What will the selected candidate be responsible for?"
          placeholder="Enter responsibility"
          items={responsibilities}
          required
          onChange={(index, value) =>
            onChange(
              "responsibilities",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd("responsibilities")
          }
          onRemove={(index) =>
            onRemove(
              "responsibilities",
              index,
            )
          }
        />

        <div className="border-t border-slate-100" />

        {/* Skills */}

        <DynamicListField
          label="Skills"
          description="Add the technical or professional skills required."
          placeholder="Enter skill"
          items={skills}
          required
          onChange={(index, value) =>
            onChange(
              "skills",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd("skills")
          }
          onRemove={(index) =>
            onRemove(
              "skills",
              index,
            )
          }
        />

        <div className="border-t border-slate-100" />

        {/* Specifications */}

        <DynamicListField
          label="Specifications"
          description="Add any additional requirements or qualifications."
          placeholder="Enter specification"
          items={specifications}
          onChange={(index, value) =>
            onChange(
              "specifications",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd("specifications")
          }
          onRemove={(index) =>
            onRemove(
              "specifications",
              index,
            )
          }
        />
      </div>

      {/* Info */}

      <div className="mt-7 flex gap-3 rounded-xl bg-slate-50 p-4">
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-emerald-500"
        />

        <p className="text-xs leading-5 text-slate-500">
          Clear requirements help job seekers understand the position and help your company attract better candidates.
        </p>
      </div>
    </section>
  );
}