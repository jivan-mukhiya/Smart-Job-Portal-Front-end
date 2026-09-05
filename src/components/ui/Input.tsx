import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

export function Input({
  leftIcon,
  rightElement,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative">

      {leftIcon && (
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          {leftIcon}
        </div>
      )}

      <input
        className={`
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
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
          disabled:text-slate-400

          ${leftIcon ? "pl-10" : "px-4"}

          ${rightElement ? "pr-11" : ""}

          ${className}
        `}
        {...props}
      />

      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}

    </div>
  );
}