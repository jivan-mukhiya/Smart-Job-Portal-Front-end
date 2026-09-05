import { routes } from "./routes";

export const registrationOptions = [
  {
    role: "JOBSEEKER",
    title: "I'm looking for a job",
    description:
      "Create your profile, discover opportunities, and apply for jobs that match your skills.",
    buttonText: "Register as Job Seeker",
    href: routes.register.jobseeker,
  },

  {
    role: "COMPANY",
    title: "I'm hiring",
    description:
      "Create your company profile, post jobs, and find talented professionals.",
    buttonText: "Register as Company",
    href: routes.register.company,
  },
] as const;