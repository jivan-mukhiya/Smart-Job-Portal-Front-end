interface DividerProps {
  text?: string;
}

export function Divider({
  text,
}: DividerProps) {
  return (
    <div className="flex items-center gap-4">

      <div className="h-px flex-1 bg-slate-200" />

      {text && (
        <span className="text-xs text-slate-400">
          {text}
        </span>
      )}

      <div className="h-px flex-1 bg-slate-200" />

    </div>
  );
}