"use client";

import { useState } from "react";

import {
ArrowRight,
Eye,
EyeOff,
LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface AdminLoginFormProps {
onSubmit: (data: {
email: string;
password: string;
}) => void | Promise<void>;

loading?: boolean;
error?: string | null;
}

export function AdminLoginForm({
onSubmit,
loading = false,
error = null,
}: AdminLoginFormProps) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [showPassword, setShowPassword] =
useState(false);

const [validationError, setValidationError] =
useState<string | null>(null);

const handleSubmit = async (
event: React.FormEvent<HTMLFormElement>,
) => {
event.preventDefault();
setValidationError(null);

const trimmedEmail = email.trim();

if (!trimmedEmail) {
  setValidationError(
    "Email address is required.",
  );
  return;
}

if (!password) {
  setValidationError(
    "Password is required.",
  );
  return;
}

await onSubmit({
  email: trimmedEmail,
  password,
});

};

const displayError =
error || validationError;

return ( <form
   onSubmit={handleSubmit}
   className="space-y-5"
 >
{/* Error */}
{displayError && ( <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"> <p className="text-sm text-red-700">
{displayError} </p> </div>
)}

  {/* Email */}
  <div>
    <label
      htmlFor="admin-email"
      className="mb-2 block text-sm font-medium text-slate-700"
    >
      Email address
    </label>

    <input
      id="admin-email"
      name="email"
      type="email"
      autoComplete="username"
      placeholder="Enter your email"
      value={email}
      onChange={(event) =>
        setEmail(event.target.value)
      }
      disabled={loading}
      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 disabled:bg-slate-100"
    />
  </div>

  {/* Password */}
  <div>
    <label
      htmlFor="admin-password"
      className="mb-2 block text-sm font-medium text-slate-700"
    >
      Password
    </label>

    <div className="relative">
      <input
        id="admin-password"
        name="password"
        type={
          showPassword
            ? "text"
            : "password"
        }
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        disabled={loading}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 disabled:bg-slate-100"
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword(
            (value) => !value,
          )
        }
        disabled={loading}
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
      >
        {showPassword ? (
          <EyeOff size={15} />
        ) : (
          <Eye size={15} />
        )}

        {showPassword
          ? "Hide"
          : "Show"}
      </button>
    </div>
  </div>

  {/* Submit */}
  <Button
    type="submit"
    disabled={loading}
    className="h-11 w-full rounded-lg"
  >
    {loading ? (
      "Signing in..."
    ) : (
      <>
        <LockKeyhole size={16} />
        Sign in
        <ArrowRight size={16} />
      </>
    )}
  </Button>
</form>
);
}
