import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-950"
    >
      {label}

      <ChevronRight size={14} />
    </Link>
  );
}