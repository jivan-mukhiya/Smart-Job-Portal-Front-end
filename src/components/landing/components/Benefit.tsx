import { CheckCircle2 } from "lucide-react";

export function Benefit({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "flex items-center gap-3 text-sm text-slate-300"
          : "flex items-center gap-3 text-sm text-slate-600"
      }
    >
      <CheckCircle2
        size={18}
        className={
          dark
            ? "shrink-0 text-emerald-400"
            : "shrink-0 text-emerald-500"
        }
      />

      <span>{text}</span>
    </div>
  );
}