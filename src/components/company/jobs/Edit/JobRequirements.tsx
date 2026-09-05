"use client";

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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Requirements
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Define the responsibilities,
          skills, and requirements for
          this position.
        </p>
      </div>

      <div className="space-y-8">
        {/* Responsibilities */}
        <DynamicListField
          label="Responsibility"
          description="Add the main responsibilities for this role."
          placeholder="e.g. Develop and maintain backend services"
          items={
            responsibilities
          }
          onChange={(
            index,
            value,
          ) =>
            onChange(
              "responsibilities",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd(
              "responsibilities",
            )
          }
          onRemove={(
            index,
          ) =>
            onRemove(
              "responsibilities",
              index,
            )
          }
        />

        {/* Skills */}
        <DynamicListField
          label="Skill"
          description="Add the technical or professional skills required for this job."
          placeholder="e.g. Java, Spring Boot, React"
          items={skills}
          onChange={(
            index,
            value,
          ) =>
            onChange(
              "skills",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd("skills")
          }
          onRemove={(
            index,
          ) =>
            onRemove(
              "skills",
              index,
            )
          }
        />

        {/* Specifications */}
        <DynamicListField
          label="Specification"
          description="Add additional requirements or qualifications."
          placeholder="e.g. Strong communication and problem-solving skills"
          items={
            specifications
          }
          onChange={(
            index,
            value,
          ) =>
            onChange(
              "specifications",
              index,
              value,
            )
          }
          onAdd={() =>
            onAdd(
              "specifications",
            )
          }
          onRemove={(
            index,
          ) =>
            onRemove(
              "specifications",
              index,
            )
          }
        />
      </div>
    </section>
  );
}