"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface CompanyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CompanyPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CompanyPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  /*
   * =========================================================
   * CREATE PAGE RANGE
   * =========================================================
   */

  const createPageRange = (): (
    number | "ellipsis"
  )[] => {
    const pages: (
      number | "ellipsis"
    )[] = [];

    if (totalPages <= 7) {
      for (
        let page = 0;
        page < totalPages;
        page++
      ) {
        pages.push(page);
      }

      return pages;
    }

    // First page
    pages.push(0);

    // Left ellipsis
    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Middle pages
    const start = Math.max(
      1,
      currentPage - 1,
    );

    const end = Math.min(
      totalPages - 2,
      currentPage + 1,
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    // Right ellipsis
    if (
      currentPage <
      totalPages - 4
    ) {
      pages.push("ellipsis");
    }

    // Last page
    pages.push(totalPages - 1);

    return pages;
  };

  const pages = createPageRange();

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <nav
      aria-label="Company pagination"
      className="
        flex
        flex-col
        items-center
        justify-between
        gap-4
        border-t
        border-slate-200
        pt-6
        sm:flex-row
      "
    >
      {/* =====================================================
          PAGE INFORMATION
      ===================================================== */}

      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        Page{" "}
        <span className="font-bold text-slate-800">
          {currentPage + 1}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-800">
          {totalPages}
        </span>
      </p>

      {/* =====================================================
          PAGINATION CONTROLS
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-1.5
        "
      >
        {/* Previous */}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === 0}
          leftIcon={
            <ChevronLeft size={16} />
          }
          onClick={() =>
            onPageChange(
              currentPage - 1,
            )
          }
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">
            Previous
          </span>
        </Button>

        {/* Page numbers */}

        <div
          className="
            hidden
            items-center
            gap-1
            sm:flex
          "
        >
          {pages.map(
            (page, index) => {
              if (
                page ===
                "ellipsis"
              ) {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      text-slate-400
                    "
                  >
                    <MoreHorizontal
                      size={16}
                    />
                  </span>
                );
              }

              const isActive =
                currentPage ===
                page;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    onPageChange(
                      page,
                    )
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-lg
                    px-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }
                  `}
                >
                  {page + 1}
                </button>
              );
            },
          )}
        </div>

        {/* Mobile page indicator */}

        <div
          className="
            flex
            h-9
            items-center
            rounded-lg
            bg-slate-100
            px-3
            text-xs
            font-bold
            text-slate-600
            sm:hidden
          "
        >
          {currentPage + 1}
          {" / "}
          {totalPages}
        </div>

        {/* Next */}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            currentPage >=
            totalPages - 1
          }
          rightIcon={
            <ChevronRight
              size={16}
            />
          }
          onClick={() =>
            onPageChange(
              currentPage + 1,
            )
          }
          aria-label="Next page"
        >
          <span className="hidden sm:inline">
            Next
          </span>
        </Button>
      </div>
    </nav>
  );
}