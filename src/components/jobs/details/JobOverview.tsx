  import {
    BriefcaseBusiness,
    GraduationCap,
    Users,
    Wallet,
  } from "lucide-react";

  export function JobOverview({
    salary,
    experience,
    education,
    vacancy,
    jobType,
    jobLevel,
  }: {
    salary: string;
    experience: number;
    education: string;
    vacancy: number;
    jobType: string;
    jobLevel: string;
  }) {
    const items = [
      {
        icon: <Wallet size={19} />,
        label: "Salary",
        value: salary,
      },
      {
        icon: <BriefcaseBusiness size={19} />,
        label: "Experience",
        value: `${experience} ${
          experience === 1 ? "year" : "years"
        }`,
      },
      {
        icon: <GraduationCap size={19} />,
        label: "Education",
        value: education,
      },
      {
        icon: <Users size={19} />,
        label: "Vacancies",
        value: `${vacancy} ${
          vacancy === 1 ? "position" : "positions"
        }`,
      },
      {
        icon: <BriefcaseBusiness size={19} />,
        label: "Job Type",
        value: jobType,
      },
      {
        icon: <BriefcaseBusiness size={19} />,
        label: "Job Level",
        value: jobLevel,
      },
    ];

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6">

        <h2 className="text-lg font-bold text-slate-950">
          Job Overview
        </h2>


        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {items.map((item) => (

            <div
              key={item.label}
              className="flex gap-3 rounded-xl bg-slate-50 p-4"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">

                {item.icon}

              </div>


              <div className="min-w-0">

                <p className="text-xs text-slate-400">
                  {item.label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {item.value}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>
    );
  }