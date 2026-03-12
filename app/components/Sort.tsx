import type { SortProps } from "@/types/components";
import type { SortField, SortOrder } from "@/types/product";

export default function Sort({
  sortBy,
  order,
  onSortChange,
  onOrderChange,
  variant = "default",
}: SortProps) {
  const selectClassName =
    variant === "table"
      ? "rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none transition focus:border-blue-500"
      : "rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none transition focus:border-blue-500";

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="font-semibold text-blue-600">Sort by:</span>

      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as SortField)}
        className={selectClassName}
      >
        <option value="patient_name">Patient Name</option>
        <option value="age">Age</option>
        <option value="patient_id">Patient ID</option>
      </select>

      <select
        value={order}
        onChange={(event) => onOrderChange(event.target.value as SortOrder)}
        className={selectClassName}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
