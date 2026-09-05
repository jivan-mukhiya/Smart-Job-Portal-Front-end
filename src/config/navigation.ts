import { routes } from "./routes";

// =========================================================
// PUBLIC NAVIGATION
// =========================================================

export const publicNavigation = [
  {
    label: "Home",
    href: routes.home,
  },
  {
    label: "Find Jobs",
    href: routes.jobs.all,
  },
  {
    label: "Companies",
    href: routes.companies.all,
  },
] as const;

// =========================================================
// JOB SEEKER NAVIGATION
// =========================================================

export const jobSeekerNavigation = [
  {
    label: "Dashboard",
    href: routes.jobseeker.dashboard,
  },
  {
    label: "Find Jobs",
    href: routes.jobs.all,
  },
  {
    label: "Companies",
    href: routes.companies.all,
  },
  {
    label: "My Profile",
    href: routes.jobseeker.profile.view,
  },
  {
    label: "My Applications",
    href: routes.jobseeker.applications.all,
  },
] as const;

// =========================================================
// COMPANY NAVIGATION
// =========================================================

export const companyNavigation = [
  {
    label: "Dashboard",
    href: routes.company.dashboard,
  },
  {
    label: "Company Profile",
    href: routes.company.profile.view,
  },
  {
    label: "Jobs",
    href: routes.company.jobs.all,
  },
  {
    label: "Applications",
    href: routes.company.applications.all,
  },
] as const;

// =========================================================
// ADMIN NAVIGATION
// =========================================================

export const adminNavigation = [
  {
    label: "Dashboard",
    href: routes.admin.dashboard,
  },
] as const;