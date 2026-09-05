export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">

      <p className="text-xl font-bold text-slate-950 sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        {label}
      </p>

    </div>
  );
}