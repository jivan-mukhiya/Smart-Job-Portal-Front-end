"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

interface DynamicListFieldProps {
  label: string;
  description?: string;
  placeholder?: string;
  items: string[];
  onChange: (
    index: number,
    value: string,
  ) => void;
  onAdd: () => void;
  onRemove: (
    index: number,
  ) => void;
}

export function DynamicListField({
  label,
  description,
  placeholder,
  items,
  onChange,
  onAdd,
  onRemove,
}: DynamicListFieldProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold text-gray-900">
          {label}
        </label>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={item}
                onChange={(event) =>
                  onChange(
                    index,
                    event.target
                      .value,
                  )
                }
                placeholder={
                  placeholder
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  onRemove(
                    index,
                  )
                }
                disabled={
                  items.length === 1
                }
                aria-label={`Remove ${label} ${index + 1}`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
      >
        <Plus className="h-4 w-4" />
        Add {label}
      </button>
    </div>
  );
}