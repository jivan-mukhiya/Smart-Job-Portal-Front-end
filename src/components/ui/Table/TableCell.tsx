import type { TdHTMLAttributes } from "react";

interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export function TableCell({
  children,
  className = "",
  ...props
}: TableCellProps) {
  return (
    <td
      className={`
        px-6
        py-5
        align-middle
        text-sm
        text-slate-700
        ${className}
      `}
      {...props}
    >
      {children}
    </td>
  );
}