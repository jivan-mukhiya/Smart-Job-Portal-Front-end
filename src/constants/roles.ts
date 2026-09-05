export const USER_ROLES = {
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  JOB_SEEKER: "JOB_SEEKER",
} as const;

export type UserRole =
  (typeof USER_ROLES)[keyof typeof USER_ROLES];