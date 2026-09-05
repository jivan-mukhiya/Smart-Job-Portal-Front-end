import type { HTMLAttributes } from "react";

interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableHeader({
  children,
  className = "",
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={`
        border-b
        border-slate-200
        bg-slate-50
        ${className}
      `}
      {...props}
    >
      {children}
    </thead>
  );
}