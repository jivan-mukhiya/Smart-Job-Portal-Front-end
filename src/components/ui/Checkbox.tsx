import type { InputHTMLAttributes } from "react";

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  label: string;
  description?: string;
}

export function Checkbox({
  id,
  label,
  description,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">

      {/* Checkbox */}

      <input
        id={id}
        type="checkbox"
        className={`
          mt-0.5
          h-4
          w-4
          shrink-0
          cursor-pointer
          rounded
          border
          border-slate-300
          bg-white
          accent-slate-950
          focus:ring-2
          focus:ring-slate-950/20
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className}
        `}
        {...props}
      />


      {/* Label + Description */}

      <div>

        <label
          htmlFor={id}
          className="cursor-pointer text-sm font-medium text-slate-700"
        >
          {label}
        </label>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        )}

      </div>

    </div>
  );
}