import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

interface ContactCardProps {
  email: string;
  phone: string;
  address: string;
}

export function ContactCard({
  email,
  phone,
  address,
}: ContactCardProps) {
  return (
    <SidebarCard title="Contact Information">

      <div className="space-y-4">

        <ContactItem
          icon={<Mail size={17} />}
          label="Email"
          value={email}
        />

        <ContactItem
          icon={<Phone size={17} />}
          label="Phone"
          value={phone}
        />

        <ContactItem
          icon={<MapPin size={17} />}
          label="Location"
          value={address}
        />

      </div>

    </SidebarCard>
  );
}


function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">

      <h2 className="text-sm font-bold text-slate-950">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>

    </section>
  );
}


function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">

        {icon}

      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value || "Not provided"}
        </p>

      </div>

    </div>
  );
}