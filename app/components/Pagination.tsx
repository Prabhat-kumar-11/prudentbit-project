import type { PaginationProps } from "@/types/components";

function getVisiblePages(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);

  return [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((left, right) => left - right);
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {visiblePages.map((pageNumber, index) => {
        const previousPage = visiblePages[index - 1];
        const showGap = previousPage && pageNumber - previousPage > 1;

        return (
          <div key={pageNumber} className="flex items-center gap-2">
            {showGap ? <span className="px-1 text-slate-400">...</span> : null}
            <button
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 min-w-9 rounded-lg px-3 font-medium transition ${
                pageNumber === page
                  ? "bg-blue-500 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {String(pageNumber).padStart(2, "0")}
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
