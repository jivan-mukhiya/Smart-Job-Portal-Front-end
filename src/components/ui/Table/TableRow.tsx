import type { HTMLAttributes } from "react";

interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({
  children,
  className = "",
  ...props
}: TableRowProps) {
  return (
    <tr
      className={`
        transition
        hover:bg-slate-50
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  );
}