import type {
  SelectHTMLAttributes,
} from "react";

export function Select({
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`
        h-11
        w-full
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        text-sm
        text-slate-900
        outline-none
        transition

        hover:border-slate-300

        focus:border-slate-950
        focus:ring-2
        focus:ring-slate-950/10

        disabled:cursor-not-allowed
        disabled:bg-slate-50

        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}