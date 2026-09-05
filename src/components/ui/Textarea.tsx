import type {
  TextareaHTMLAttributes,
} from "react";

export function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`
        min-h-32
        w-full
        resize-y
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-sm
        leading-6
        text-slate-900
        outline-none
        transition

        placeholder:text-slate-400

        hover:border-slate-300

        focus:border-slate-950
        focus:ring-2
        focus:ring-slate-950/10

        disabled:cursor-not-allowed
        disabled:bg-slate-50

        ${className}
      `}
      {...props}
    />
  );
}