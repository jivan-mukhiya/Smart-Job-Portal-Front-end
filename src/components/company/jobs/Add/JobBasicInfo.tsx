"use client";

import {
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FormLabel } from "@/components/ui/FormLabel";

interface JobBasicInfoProps {
  form: {
    title: string;
    description: string;
    location: string;
  };

  onChange: (
    field: string,
    value: string,
  ) => void;
}

export function JobBasicInfo({
  form,
  onChange,
}: JobBasicInfoProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      {/* Header */}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <BriefcaseBusiness size={19} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950">
            Basic Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Provide the main information about this job.
          </p>
        </div>
      </div>

      {/* Fields */}

      <div className="mt-7 space-y-5">
        {/* Title */}

        <div>
          <FormLabel
            htmlFor="title"
            required
          >
            Job Title
          </FormLabel>

          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={(event) =>
              onChange(
                "title",
                event.target.value,
              )
            }
            placeholder="e.g. Java Backend Developer"
            leftIcon={
              <BriefcaseBusiness size={17} />
            }
            required
          />
        </div>

        {/* Description */}

        <div>
          <FormLabel
            htmlFor="description"
            required
          >
            Job Description
          </FormLabel>

          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(event) =>
              onChange(
                "description",
                event.target.value,
              )
            }
            placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
            className="min-h-40"
            required
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Provide a clear description of the position.
          </p>
        </div>

        {/* Location */}

        <div>
          <FormLabel
            htmlFor="location"
            required
          >
            Location
          </FormLabel>

          <Input
            id="location"
            name="location"
            value={form.location}
            onChange={(event) =>
              onChange(
                "location",
                event.target.value,
              )
            }
            placeholder="e.g. Kathmandu, Nepal"
            leftIcon={
              <MapPin size={17} />
            }
            required
          />
        </div>
      </div>
    </section>
  );
}