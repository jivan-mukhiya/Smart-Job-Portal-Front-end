interface Props {
  label: string;

  value: string;
}

export function DetailRow({
  label,
  value,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4">

      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm font-semibold text-slate-800">
        {value}
      </span>

    </div>
  );
}