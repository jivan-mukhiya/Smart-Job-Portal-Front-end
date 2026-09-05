import {
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormLabel } from "@/components/ui/FormLabel";

interface DynamicListFieldProps {
  label: string;

  description?: string;

  placeholder: string;

  items: string[];

  required?: boolean;

  onChange: (
    index: number,
    value: string
  ) => void;

  onAdd: () => void;

  onRemove: (
    index: number
  ) => void;
}

export function DynamicListField({
  label,
  description,
  placeholder,
  items,
  required = false,
  onChange,
  onAdd,
  onRemove,
}: DynamicListFieldProps) {
  return (
    <div>

      <FormLabel required={required}>
        {label}
      </FormLabel>

      {description && (
        <p className="mb-3 text-xs text-slate-400">
          {description}
        </p>
      )}


      {/* Items */}

      <div className="space-y-3">

        {items.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-2"
          >

            <div className="flex-1">

              <Input
                value={item}
                onChange={(e) =>
                  onChange(
                    index,
                    e.target.value
                  )
                }
                placeholder={`${placeholder} ${index + 1}`}
              />

            </div>


            {/* Remove */}

            <button
              type="button"
              onClick={() =>
                onRemove(index)
              }
              disabled={items.length === 1}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Remove ${label}`}
            >

              <Trash2 size={17} />

            </button>

          </div>

        ))}

      </div>


      {/* Add */}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        leftIcon={
          <Plus size={16} />
        }
        onClick={onAdd}
      >
        Add {label}
      </Button>

    </div>
  );
}