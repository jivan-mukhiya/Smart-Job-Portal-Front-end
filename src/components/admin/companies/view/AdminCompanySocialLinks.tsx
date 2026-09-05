
import { ExternalLink } from "lucide-react";

interface AdminCompanySocialLinksProps {
  socialLinks: {
    id: number;
    platform: string;
    url: string;
  }[];
}

export function AdminCompanySocialLinks({
  socialLinks,
}: AdminCompanySocialLinksProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          Social Links
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Company social media profiles
        </p>
      </div>

      {socialLinks.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {social.platform}
                </p>

                <p className="mt-0.5 max-w-[250px] truncate text-xs text-slate-400">
                  {social.url}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="ml-3 shrink-0 text-slate-400"
              />
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          No social links available.
        </p>
      )}
    </section>
  );
}
