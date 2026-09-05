import type { ReactNode } from "react";

interface AccountTypeButtonProps {
  active: boolean;
  icon: ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}

export function AccountTypeButton({
  active,
  icon,
  title,
  description,
  onClick,
}: AccountTypeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        border
        p-3
        text-left
        transition

        ${
          active
            ? "border-slate-950 bg-slate-950 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
        }
      `}
    >

      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            active
              ? "bg-white/10"
              : "bg-slate-100"
          }
        `}
      >
        {icon}
      </div>


      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        {description && (
          <p
            className={
              active
                ? "mt-0.5 text-xs text-slate-300"
                : "mt-0.5 text-xs text-slate-500"
            }
          >
            {description}
          </p>
        )}

      </div>

    </button>
  );
}