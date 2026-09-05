"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Mail,
  User,
  Users,
} from "lucide-react";

import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { USER_ROLES } from "@/constants/roles";
import { useRegister } from "@/hooks/useRegister";

import type { RegisterRequest } from "@/types/auth";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { AccountTypeButton } from "@/components/ui/AccountTypeButton";

/* =============================================================
   ACCOUNT TYPE
============================================================= */

type AccountType = "JOB_SEEKER" | "COMPANY";

/* =============================================================
   REGISTER FORM
============================================================= */

export default function RegisterForm() {
  const router = useRouter();

  const [accountType, setAccountType] =
    useState<AccountType>("JOB_SEEKER");

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  /* =============================================================
     REGISTRATION HOOK
  ============================================================= */

  const {
    register,
    loading,
    error,
    fieldErrors,
    success,
  } = useRegister();

  /* =============================================================
     SUBMIT
  ============================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /* -----------------------------------------------------------
       PASSWORD CONFIRMATION
    ----------------------------------------------------------- */

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    /* -----------------------------------------------------------
       TERMS
    ----------------------------------------------------------- */

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service.");
      return;
    }

    /* -----------------------------------------------------------
       REQUEST DATA
    ----------------------------------------------------------- */

    const data: RegisterRequest = {
      fullName:
        accountType === "JOB_SEEKER"
          ? fullName
          : companyName,

      email,

      password,

      role:
        accountType === "JOB_SEEKER"
          ? USER_ROLES.JOB_SEEKER
          : USER_ROLES.COMPANY,
    };

    console.log("Register Request:", data);

    /* -----------------------------------------------------------
       API CALL
    ----------------------------------------------------------- */

    const response = await register(data);

    /* -----------------------------------------------------------
       SUCCESS NAVIGATION
       
       JOB SEEKER
       → Login page

       COMPANY
       → Company profile page
    ----------------------------------------------------------- */

    if (response) {
      console.log("Register Response:", response);

      if (accountType === "JOB_SEEKER") {
        router.push(routes.auth.login);
      } else {
        router.push(routes.auth.login);
      }
    }
  };

  /* =============================================================
     RENDER
  ============================================================= */

  return (
    <main className="min-h-screen bg-slate-50">
      <RegisterHeader />

      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-lg">
          <RegisterHeading />

          <RegisterCard
            accountType={accountType}
            setAccountType={setAccountType}
            fullName={fullName}
            setFullName={setFullName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            agreeTerms={agreeTerms}
            setAgreeTerms={setAgreeTerms}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            fieldErrors={fieldErrors}
            success={success}
          />

          <LoginLink />
        </div>
      </section>
    </main>
  );
}

/* =============================================================
   HEADER
============================================================= */

function RegisterHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href={routes.home}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BriefcaseBusiness
              size={20}
              strokeWidth={2.2}
            />
          </div>

          <span className="text-[17px] font-bold tracking-tight text-slate-950">
            {siteConfig.name}
          </span>
        </Link>
      </div>
    </header>
  );
}

/* =============================================================
   HEADING
============================================================= */

function RegisterHeading() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
        <User size={25} />
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
        Create your account
      </h1>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Join {siteConfig.name} and take the next step in your career.
      </p>
    </div>
  );
}

/* =============================================================
   REGISTER CARD
============================================================= */

interface RegisterCardProps {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;

  fullName: string;
  setFullName: (value: string) => void;

  companyName: string;
  setCompanyName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  password: string;
  setPassword: (value: string) => void;

  confirmPassword: string;
  setConfirmPassword: (value: string) => void;

  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;

  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;

  loading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  success: string | null;
}

function RegisterCard({
  accountType,
  setAccountType,
  fullName,
  setFullName,
  companyName,
  setCompanyName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  agreeTerms,
  setAgreeTerms,
  handleSubmit,
  loading,
  error,
  fieldErrors,
  success,
}: RegisterCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <AccountTypeSection
        accountType={accountType}
        setAccountType={setAccountType}
      />

      <RegisterFields
        accountType={accountType}
        fullName={fullName}
        setFullName={setFullName}
        companyName={companyName}
        setCompanyName={setCompanyName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        fieldErrors={fieldErrors}
        success={success}
      />
    </div>
  );
}

/* =============================================================
   ACCOUNT TYPE
============================================================= */

interface AccountTypeSectionProps {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

function AccountTypeSection({
  accountType,
  setAccountType,
}: AccountTypeSectionProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-slate-900">
        I want to register as
      </p>

      <div className="grid grid-cols-2 gap-3">
        <AccountTypeButton
          active={accountType === "JOB_SEEKER"}
          icon={<Users size={18} />}
          title="Job Seeker"
          description="Find your next job"
          onClick={() =>
            setAccountType("JOB_SEEKER")
          }
        />

        <AccountTypeButton
          active={accountType === "COMPANY"}
          icon={<Building2 size={18} />}
          title="Company"
          description="Hire great talent"
          onClick={() =>
            setAccountType("COMPANY")
          }
        />
      </div>
    </div>
  );
}

/* =============================================================
   REGISTER FIELDS
============================================================= */

interface RegisterFieldsProps {
  accountType: AccountType;

  fullName: string;
  setFullName: (value: string) => void;

  companyName: string;
  setCompanyName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  password: string;
  setPassword: (value: string) => void;

  confirmPassword: string;
  setConfirmPassword: (value: string) => void;

  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;

  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;

  loading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  success: string | null;
}

function RegisterFields({
  accountType,
  fullName,
  setFullName,
  companyName,
  setCompanyName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  agreeTerms,
  setAgreeTerms,
  handleSubmit,
  loading,
  error,
  fieldErrors,
  success,
}: RegisterFieldsProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-7 space-y-5"
    >
      {/* GENERAL BACKEND ERROR */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* FULL NAME / COMPANY NAME */}

      {accountType === "JOB_SEEKER" ? (
        <FormField
          label="Full name"
          htmlFor="fullName"
          required
        >
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            placeholder="Enter your full name"
            autoComplete="name"
            required
            leftIcon={<User size={18} />}
          />

          {fieldErrors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.fullName}
            </p>
          )}
        </FormField>
      ) : (
        <FormField
          label="Company name"
          htmlFor="companyName"
          required
        >
          <Input
            id="companyName"
            name="companyName"
            type="text"
            value={companyName}
            onChange={(event) =>
              setCompanyName(event.target.value)
            }
            placeholder="Enter company name"
            autoComplete="organization"
            required
            leftIcon={<Building2 size={18} />}
          />

          {fieldErrors.companyName && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.companyName}
            </p>
          )}
        </FormField>
      )}

      {/* EMAIL */}

      <FormField
        label="Email address"
        htmlFor="email"
        required
      >
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="you@example.com"
          autoComplete="email"
          required
          leftIcon={<Mail size={18} />}
        />

        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">
            {fieldErrors.email}
          </p>
        )}
      </FormField>

      {/* PASSWORD */}

      <FormField
        label="Password"
        htmlFor="password"
        required
        hint="Use at least 8 characters."
      >
        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />

        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">
            {fieldErrors.password}
          </p>
        )}
      </FormField>

      {/* CONFIRM PASSWORD */}

      <FormField
        label="Confirm password"
        htmlFor="confirmPassword"
        required
      >
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
        />
      </FormField>

      {/* TERMS */}

      <Checkbox
        id="terms"
        name="terms"
        checked={agreeTerms}
        onChange={(event) =>
          setAgreeTerms(event.target.checked)
        }
        label={
          <>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-slate-900 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-slate-900 hover:underline"
            >
              Privacy Policy
            </Link>
          </>
        }
      />

      {/* SUBMIT */}

      <Button
        type="submit"
        fullWidth
        size="lg"
        disabled={loading}
        rightIcon={<ArrowRight size={17} />}
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </Button>
    </form>
  );
}

/* =============================================================
   LOGIN LINK
============================================================= */

function LoginLink() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href={routes.auth.login}
          className="font-semibold text-slate-900 transition hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
