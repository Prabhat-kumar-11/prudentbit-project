import type { SearchBarProps } from "@/types/components";

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search patient, issue, contact or ID",
  variant = "default",
}: SearchBarProps) {
  const wrapperClassName =
    variant === "table"
      ? "flex items-center gap-3 rounded-md border border-slate-300 bg-white px-3 py-2.5 shadow-sm"
      : "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm";

  return (
    <div className={wrapperClassName}>
      <span className="text-sm text-blue-500">⌕</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          Clear
        </button>
      ) : null}

      {variant === "table" ? (
        <span className="text-slate-400" aria-hidden="true">
          ≡
        </span>
      ) : null}
    </div>
  );
}
