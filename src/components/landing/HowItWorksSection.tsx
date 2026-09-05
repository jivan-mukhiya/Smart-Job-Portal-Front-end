import { Step } from "./components/Step";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create your account",
      description:
        "Choose whether you're a job seeker or a company and create your account.",
    },

    {
      number: "02",
      title: "Build your profile",
      description:
        "Add your skills, experience, education, company information, or job requirements.",
    },

    {
      number: "03",
      title: "Connect & grow",
      description:
        "Apply for opportunities or find the right talent for your organization.",
    },
  ];

  return (
    <section className="py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Simple process
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Get started in three simple steps
          </h2>

        </div>


        <div className="mt-14 grid gap-10 md:grid-cols-3">

          {steps.map((step) => (
            <Step
              key={step.number}
              {...step}
            />
          ))}

        </div>

      </div>

    </section>
  );
}