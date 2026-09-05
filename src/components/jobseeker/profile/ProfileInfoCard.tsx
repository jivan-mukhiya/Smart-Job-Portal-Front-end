import {
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

interface ProfileInfoCardProps {
  openToWork: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ProfileInfoCard({
  openToWork,
  createdAt,
  updatedAt,
}: ProfileInfoCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      <h2 className="text-sm font-bold text-slate-950">
        Profile Information
      </h2>


      <div className="mt-5 space-y-4">

        <InfoItem
          icon={
            <CheckCircle2 size={17} />
          }
          label="Status"
          value={
            openToWork
              ? "Open to Work"
              : "Active"
          }
        />


        <InfoItem
          icon={
            <CalendarDays size={17} />
          }
          label="Joined"
          value={formatDate(createdAt)}
        />


        <InfoItem
          icon={
            <CalendarDays size={17} />
          }
          label="Last Updated"
          value={formatDate(updatedAt)}
        />

      </div>

    </section>
  );
}


function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">

        {icon}

      </div>

      <div>

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}


function formatDate(
  date: string
) {
  if (!date) {
    return "Not available";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}