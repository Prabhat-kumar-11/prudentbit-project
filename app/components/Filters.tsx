import type { FiltersProps } from "@/types/components";

export default function Filters({
  categories,
  selectedCategory,
  activeCount,
  onSelect,
  showHeader = true,
  variant = "default",
}: FiltersProps) {
  return (
    <div className="space-y-4">
      {showHeader ? (
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="font-medium text-slate-700">
            Filter by medical issue
          </span>
          <span>Active Filters: {activeCount}</span>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect("")}
          className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
            selectedCategory === ""
              ? variant === "table"
                ? "border-slate-300 bg-slate-50 text-slate-700 shadow-sm"
                : "border-blue-500 bg-blue-50 text-blue-600"
              : variant === "table"
                ? "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          All issues
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className={`rounded-md border px-3 py-2 text-sm font-medium capitalize transition ${
                isSelected
                  ? variant === "table"
                    ? "border-slate-300 bg-slate-50 text-slate-700 shadow-sm"
                    : "border-blue-500 bg-blue-50 text-blue-600"
                  : variant === "table"
                    ? "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span>{category}</span>
              {variant === "table" && isSelected ? (
                <span className="ml-2">×</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
