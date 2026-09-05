import type { ThHTMLAttributes } from "react";

interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export function TableHead({
  children,
  className = "",
  ...props
}: TableHeadProps) {
  return (
    <th
      className={`
        whitespace-nowrap
        px-6
        py-4
        text-left
        text-xs
        font-bold
        uppercase
        tracking-wide
        text-slate-500
        ${className}
      `}
      {...props}
    >
      {children}
    </th>
  );
}