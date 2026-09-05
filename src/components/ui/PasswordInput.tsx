"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import { useState } from "react";

interface PasswordInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {}

export function PasswordInput({
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">

      <LockKeyhole
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className={`
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-10
          pr-11
          text-sm
          text-slate-900
          outline-none
          transition

          placeholder:text-slate-400

          hover:border-slate-300

          focus:border-slate-950
          focus:ring-2
          focus:ring-slate-950/10

          ${className}
        `}
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword((value) => !value)
        }
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label={
          showPassword
            ? "Hide password"
            : "Show password"
        }
      >
        {showPassword ? (
          <EyeOff size={17} />
        ) : (
          <Eye size={17} />
        )}
      </button>

    </div>
  );
}