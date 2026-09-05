
import {
  Globe,
  Mail,
  Phone,
} from "lucide-react";

interface AdminCompanyContactProps {
  email: string | null;
  phone: string | null;
  website: string | null;
}

export function AdminCompanyContact({
  email,
  phone,
  website,
}: AdminCompanyContactProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-950">
        Contact Information
      </h2>

      <div className="space-y-4">
        <InfoRow
          icon={<Mail size={17} />}
          label="Email"
          value={email || "Not available"}
        />

        <InfoRow
          icon={<Phone size={17} />}
          label="Phone"
          value={phone || "Not available"}
        />

        <InfoRow
          icon={<Globe size={17} />}
          label="Website"
          value={website || "Not available"}
          href={website || undefined}
        />
      </div>
    </section>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: InfoRowProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-sm font-medium text-slate-700 hover:text-slate-950 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 break-all text-sm font-medium text-slate-700">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
