import type { TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({
  children,
  className = "",
  ...props
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={`
          w-full
          min-w-[900px]
          border-collapse
          text-left
          ${className}
        `}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}