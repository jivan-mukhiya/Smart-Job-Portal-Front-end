export const routes = {
home: "/",

// ============================================================
// AUTH
// ============================================================

auth: {
login: "/auth/login",
register: "/auth/register",
forgotPassword: "/auth/forgot-password",

// ADMIN LOGIN
adminLogin: "/auth/admin/login",

},

// ============================================================
// REGISTRATION
// ============================================================

register: {
company: "/auth/register/company",
jobseeker: "/auth/register/jobseeker",
},

// ============================================================
// JOBSEEKER JOBS
// ============================================================

jobs: {
all: "/dashboard/jobseeker/jobs",

details: (id: number | string) =>
  `/dashboard/jobseeker/jobs/${id}`,

},

// ============================================================
// JOBSEEKER COMPANIES
// ============================================================

companies: {
all: "/dashboard/jobseeker/companies",

details: (id: number | string) =>
  `/dashboard/jobseeker/companies/${id}`,

},

// ============================================================
// COMPANY DASHBOARD
// ============================================================

company: {
dashboard: "/dashboard/company",

// ----------------------------------------------------------
// COMPANY PROFILE
// ----------------------------------------------------------

profile: {
  view: "/dashboard/company/profile/view",

  edit: "/dashboard/company/profile",
},

// ----------------------------------------------------------
// COMPANY JOBS
// ----------------------------------------------------------

jobs: {
  all: "/dashboard/company/jobs",

  // ADD JOB
  add: "/dashboard/company/jobs/add",

  // Alias for existing components
  create: "/dashboard/company/jobs/add",

  details: (id: number | string) =>
    `/dashboard/company/jobs/${id}`,

  edit: (id: number | string) =>
    `/dashboard/company/jobs/edit/${id}`,

  view: (id: number | string) =>
    `/dashboard/company/jobs/view/${id}`,
},

// ----------------------------------------------------------
// COMPANY APPLICATIONS
// ----------------------------------------------------------

applications: {
  all: "/dashboard/company/applications",

  details: (id: number | string) =>
    `/dashboard/company/applications/${id}`,
},

},

// ============================================================
// JOBSEEKER DASHBOARD
// ============================================================

jobseeker: {
dashboard: "/dashboard/jobseeker",

profile: {
  view: "/dashboard/jobseeker/profile",

  edit: "/dashboard/jobseeker/profile/edit",
},

applications: {
  all: "/dashboard/jobseeker/applications",

  details: (id: number | string) =>
    `/dashboard/jobseeker/applications/${id}`,
},

},

// ============================================================
// ADMIN
// ============================================================

admin: {
// ----------------------------------------------------------
// ADMIN DASHBOARD
// ----------------------------------------------------------

dashboard: "/dashboard/admin",

// ----------------------------------------------------------
// MANAGE COMPANIES
// ----------------------------------------------------------

companies: {
  all: "/dashboard/admin/companies",

  details: (id: number | string) =>
    `/dashboard/admin/companies/${id}`,
},

// ----------------------------------------------------------
// MANAGE USERS
// ----------------------------------------------------------

users: {
  all: "/dashboard/admin/users",

  details: (id: number | string) =>
    `/dashboard/admin/users/${id}`,
},

},
} as const;
