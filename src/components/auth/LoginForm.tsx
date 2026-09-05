"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  LockKeyhole,
  Mail,
  Users,
} from "lucide-react";

import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { USER_ROLES } from "@/constants/roles";

import { useAuth } from "@/context/AuthContext";
import { useLogin } from "@/hooks/useLogin";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FormField } from "@/components/ui/FormField";
import { Divider } from "@/components/ui/Divider";
import { AccountTypeButton } from "@/components/ui/AccountTypeButton";
import { Checkbox } from "@/components/ui/Checkbox";

/* =============================================================
   TYPES
============================================================= */

type AccountType = "JOB_SEEKER" | "COMPANY";

/* =============================================================
   MAIN LOGIN FORM
============================================================= */

export function LoginForm() {
  const router = useRouter();

  /*
   * Selected account type.
   */
  const [accountType, setAccountType] =
    useState<AccountType>("JOB_SEEKER");

  /*
   * Login form values.
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
   * Login API hook.
   */
  const {
    login,
    loading,
    error,
    fieldErrors,
  } = useLogin();

  /*
   * IMPORTANT:
   *
   * AuthContext is now the single source of truth
   * for the currently logged-in user.
   *
   * setAuthUser():
   *   1. Saves JWT/user information to storage.
   *   2. Updates React authentication state.
   *   3. Causes Navbar and other components using
   *      useAuth() to immediately re-render.
   */
  const {
    login: setAuthUser,
  } = useAuth();

  /* ===========================================================
     LOGIN SUBMIT
  =========================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /* =========================================================
       BASIC VALIDATION
    ========================================================= */

    if (!email.trim()) {
      toast.error(
        "Please enter your email address."
      );

      return;
    }

    if (!password) {
      toast.error(
        "Please enter your password."
      );

      return;
    }

    /* =========================================================
       CALL LOGIN API

       The selected account type is sent to useLogin().

       Example:

       Selected account type:
       JOB_SEEKER

       Backend returns:
       COMPANY

       useLogin() rejects the login.
    ========================================================= */

    const response = await login(
      {
        email: email.trim(),
        password,
      },
      accountType
    );

    /* =========================================================
       LOGIN FAILED

       This also covers account-type mismatch.
    ========================================================= */

    if (!response) {
      return;
    }

    /* =========================================================
       GET ACTUAL ROLE FROM BACKEND
    ========================================================= */

    const role = response.data.role;

    /* =========================================================
       JOB SEEKER
    ========================================================= */

    if (
      role === USER_ROLES.JOB_SEEKER
    ) {
      /*
       * IMPORTANT:
       *
       * Save authentication state BEFORE navigation.
       *
       * AuthContext will:
       *   - save accessToken
       *   - save refreshToken
       *   - save user information
       *   - update React user state
       */
      setAuthUser(response.data);

      /*
       * Navigate after auth state has been updated.
       */
      router.push(routes.jobs.all);

      return;
    }

    /* =========================================================
       COMPANY
    ========================================================= */

    if (
      role === USER_ROLES.COMPANY
    ) {
      /*
       * Save authentication state BEFORE navigation.
       */
      setAuthUser(response.data);

      /*
       * Navigate to company dashboard.
       */
      router.push(
        routes.company.dashboard
      );

      return;
    }

    /* =========================================================
       UNSUPPORTED ROLE
    ========================================================= */

    toast.error(
      "Your account role is not supported."
    );
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <LoginHeader />

      {/* =====================================================
          LOGIN CONTENT
      ===================================================== */}

      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6">

        <div className="w-full max-w-md">

          {/* =================================================
              HEADER CONTENT
          ================================================= */}

          <LoginHeaderContent />

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <LoginCard
            accountType={accountType}
            setAccountType={setAccountType}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            fieldErrors={fieldErrors}
          />

          {/* =================================================
              TERMS
          ================================================= */}

          <LoginTerms />

        </div>

      </section>

    </main>
  );
}

/* =============================================================
   LOGIN HEADER
============================================================= */

function LoginHeader() {
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
   LOGIN HEADER CONTENT
============================================================= */

function LoginHeaderContent() {
  return (
    <div className="mb-8 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">

        <LockKeyhole size={25} />

      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Sign in to continue to your Smart Job Portal account.
      </p>

    </div>
  );
}

/* =============================================================
   LOGIN CARD
============================================================= */

interface LoginCardProps {
  accountType: AccountType;

  setAccountType: (
    type: AccountType
  ) => void;

  email: string;

  setEmail: (
    value: string
  ) => void;

  password: string;

  setPassword: (
    value: string
  ) => void;

  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;

  loading: boolean;

  error: string | null;

  fieldErrors: Record<string, string>;
}

function LoginCard({
  accountType,
  setAccountType,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
  fieldErrors,
}: LoginCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* =================================================
          ACCOUNT TYPE
      ================================================= */}

      <AccountTypeSection
        accountType={accountType}
        setAccountType={setAccountType}
      />

      {/* =================================================
          LOGIN FIELDS
      ================================================= */}

      <LoginFormFields
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        fieldErrors={fieldErrors}
      />

      {/* =================================================
          REGISTER
      ================================================= */}

      <RegisterSection
        accountType={accountType}
      />

    </div>
  );
}

/* =============================================================
   ACCOUNT TYPE SECTION
============================================================= */

interface AccountTypeSectionProps {
  accountType: AccountType;

  setAccountType: (
    type: AccountType
  ) => void;
}

function AccountTypeSection({
  accountType,
  setAccountType,
}: AccountTypeSectionProps) {
  /*
   * Selecting account type only changes
   * the selected login role.
   *
   * It does NOT navigate.
   */
  const handleAccountType = (
    type: AccountType
  ) => {
    setAccountType(type);
  };

  return (
    <div>

      <p className="mb-3 text-sm font-semibold text-slate-900">
        Login as
      </p>

      <div className="grid grid-cols-2 gap-3">

        {/* =================================================
            JOB SEEKER
        ================================================= */}

        <AccountTypeButton
          active={
            accountType === "JOB_SEEKER"
          }
          icon={
            <Users size={18} />
          }
          title="Job Seeker"
          description="Find your next job"
          onClick={() =>
            handleAccountType(
              "JOB_SEEKER"
            )
          }
        />

        {/* =================================================
            COMPANY
        ================================================= */}

        <AccountTypeButton
          active={
            accountType === "COMPANY"
          }
          icon={
            <Building2 size={18} />
          }
          title="Company"
          description="Find great talent"
          onClick={() =>
            handleAccountType(
              "COMPANY"
            )
          }
        />

      </div>

    </div>
  );
}

/* =============================================================
   LOGIN FORM FIELDS
============================================================= */

interface LoginFormFieldsProps {
  email: string;

  setEmail: (
    value: string
  ) => void;

  password: string;

  setPassword: (
    value: string
  ) => void;

  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;

  loading: boolean;

  error: string | null;

  fieldErrors: Record<string, string>;
}

function LoginFormFields({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
  fieldErrors,
}: LoginFormFieldsProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-7 space-y-5"
    >

      {/* =================================================
          GENERAL ERROR
      ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =================================================
          EMAIL
      ================================================= */}

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
            setEmail(
              event.target.value
            )
          }
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={loading}
          leftIcon={
            <Mail size={18} />
          }
        />

        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-500">
            {fieldErrors.email}
          </p>
        )}

      </FormField>

      {/* =================================================
          PASSWORD
      ================================================= */}

      <FormField
        label="Password"
        htmlFor="password"
        required
      >

        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          disabled={loading}
        />

        {fieldErrors.password && (
          <p className="mt-1 text-xs text-red-500">
            {fieldErrors.password}
          </p>
        )}

      </FormField>

      {/* =================================================
          REMEMBER + FORGOT PASSWORD
      ================================================= */}

      <div className="flex items-center justify-between">

        <Checkbox
          id="remember"
          label="Remember me"
        />

        <Link
          href={
            routes.auth.forgotPassword
          }
          className="text-xs font-semibold text-slate-600 transition hover:text-slate-950"
        >
          Forgot password?
        </Link>

      </div>

      {/* =================================================
          LOGIN BUTTON
      ================================================= */}

      <Button
        type="submit"
        fullWidth
        size="lg"
        disabled={loading}
        rightIcon={
          loading
            ? undefined
            : <ArrowRight size={17} />
        }
      >
        {loading
          ? "Signing in..."
          : "Sign in"}
      </Button>

    </form>
  );
}

/* =============================================================
   REGISTER SECTION
============================================================= */

interface RegisterSectionProps {
  accountType: AccountType;
}

function RegisterSection({
  accountType,
}: RegisterSectionProps) {
  const accountName =
    accountType === "COMPANY"
      ? "Company"
      : "Job Seeker";

  return (
    <>
      <div className="my-7">

        <Divider
          text="New to Smart Job Portal?"
        />

      </div>

      <Link
        href={routes.auth.register}
        className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
      >
        Create {accountName} Account
      </Link>
    </>
  );
}

/* =============================================================
   LOGIN TERMS
============================================================= */

function LoginTerms() {
  return (
    <p className="mt-6 text-center text-xs leading-5 text-slate-400">

      By continuing, you agree to our{" "}

      <Link
        href="/terms"
        className="font-medium text-slate-600 transition hover:text-slate-950"
      >
        Terms of Service
      </Link>{" "}

      and{" "}

      <Link
        href="/privacy"
        className="font-medium text-slate-600 transition hover:text-slate-950"
      >
        Privacy Policy
      </Link>.

    </p>
  );
}