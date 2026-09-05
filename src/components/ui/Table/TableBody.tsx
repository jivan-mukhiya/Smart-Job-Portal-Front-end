import type { HTMLAttributes } from "react";

interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableBody({
  children,
  className = "",
  ...props
}: TableBodyProps) {
  return (
    <tbody
      className={`
        divide-y
        divide-slate-100
        bg-white
        ${className}
      `}
      {...props}
    >
      {children}
    </tbody>
  );
}