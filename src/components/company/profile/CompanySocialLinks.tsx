"use client";

import {
  Link2,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormLabel } from "@/components/ui/FormLabel";

interface SocialLink {
  platform: string;
  url: string;
}

interface CompanySocialLinksProps {
  socialLinks: SocialLink[];

  onChange: (
    index: number,
    field:
      | "platform"
      | "url",
    value: string,
  ) => void;

  onAdd: () => void;

  onRemove: (
    index: number,
  ) => void;
}

export function CompanySocialLinks({
  socialLinks,
  onChange,
  onAdd,
  onRemove,
}: CompanySocialLinksProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Link2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Social Links
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your company's social media profiles.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={
            <Plus size={16} />
          }
          onClick={onAdd}
        >
          Add Social Link
        </Button>
      </div>

      {/* LINKS */}

      <div className="mt-7 space-y-4">
        {socialLinks.map(
          (
            socialLink,
            index,
          ) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-end">
                {/* PLATFORM */}

                <div>
                  <FormLabel
                    htmlFor={`platform-${index}`}
                  >
                    Platform
                  </FormLabel>

                  <Input
                    id={`platform-${index}`}
                    value={
                      socialLink.platform
                    }
                    placeholder="LinkedIn"
                    onChange={(
                      event,
                    ) =>
                      onChange(
                        index,
                        "platform",
                        event.target
                          .value,
                      )
                    }
                  />
                </div>

                {/* URL */}

                <div>
                  <FormLabel
                    htmlFor={`social-url-${index}`}
                  >
                    URL
                  </FormLabel>

                  <Input
                    id={`social-url-${index}`}
                    type="url"
                    value={
                      socialLink.url
                    }
                    placeholder="https://linkedin.com/company/..."
                    onChange={(
                      event,
                    ) =>
                      onChange(
                        index,
                        "url",
                        event.target
                          .value,
                      )
                    }
                  />
                </div>

                {/* REMOVE */}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  leftIcon={
                    <Trash2 size={16} />
                  }
                  onClick={() =>
                    onRemove(index)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ),
        )}

        {/* EMPTY */}

        {socialLinks.length ===
          0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <Link2
              size={24}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium text-slate-700">
              No social links added
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add LinkedIn, Facebook,
              Instagram, or other profiles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
