"use client";

import { useEffect, useMemo, useState } from "react";

import CardView from "./components/CardView";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import RowView from "./components/RowView";
import SearchBar from "./components/SearchBar";
import Sort from "./components/Sort";

import type {
  Patient,
  ProductsResponse,
  SortField,
  SortOrder,
  ViewMode,
} from "@/types/product";

const DEFAULT_SORT: SortField = "patient_name";
const DEFAULT_ORDER: SortOrder = "asc";
const PAGE_SIZE = 10;

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortField>(DEFAULT_SORT);
  const [order, setOrder] = useState<SortOrder>(DEFAULT_ORDER);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          sort: sortBy,
          order,
        });

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        if (selectedCategory) {
          params.set("category", selectedCategory);
        }

        const res = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("API Error");
        }

        const data: ProductsResponse = await res.json();

        setPatients(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setCategories(data.categories);
        setPage((currentPage) =>
          currentPage === data.page ? currentPage : data.page,
        );
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Something went wrong",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchPatients();

    return () => controller.abort();
  }, [debouncedSearch, order, page, selectedCategory, sortBy]);

  const activeFilters = useMemo(() => {
    return [
      search.trim(),
      selectedCategory,
      sortBy !== DEFAULT_SORT ? sortBy : "",
      order !== DEFAULT_ORDER ? order : "",
    ].filter(Boolean).length;
  }, [order, search, selectedCategory, sortBy]);

  const isTableView = viewMode === "table";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <section className="relative overflow-hidden border-b border-blue-400 bg-gradient-to-r from-[#2f76f3] to-[#5b9dff] text-white shadow-lg">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 opacity-20 md:block">
          <div className="absolute right-10 top-8 h-24 w-24 rounded-3xl bg-white/40 blur-sm" />
          <div className="absolute right-32 top-16 h-16 w-16 rounded-2xl bg-white/30" />
          <div className="absolute right-24 bottom-8 h-20 w-20 rounded-full bg-white/20 blur-xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">Patient Directory</h1>
          <p className="mt-1 text-sm text-blue-100">{total} Patients Found</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/70 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-3 text-sm font-medium text-slate-500 md:flex-row md:items-end md:justify-between">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`border-b-2 px-1 pb-1 transition ${
                  viewMode === "table"
                    ? "border-blue-500 text-slate-900"
                    : "border-transparent hover:text-slate-700"
                }`}
              >
                Table View
              </button>

              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={`border-b-2 px-1 pb-1 transition ${
                  viewMode === "card"
                    ? "border-blue-500 text-slate-900"
                    : "border-transparent hover:text-slate-700"
                }`}
              >
                Card View
              </button>
            </div>

            {isTableView ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-blue-500">≡</span>
                <span>Active Filters: {activeFilters}</span>
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            {isTableView ? (
              <>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex-1">
                    <SearchBar
                      value={search}
                      onChange={setSearch}
                      onClear={() => setSearch("")}
                      placeholder="Search"
                      variant="table"
                    />
                  </div>

                  <Sort
                    sortBy={sortBy}
                    order={order}
                    variant="table"
                    onSortChange={(value) => {
                      setSortBy(value);
                      setPage(1);
                    }}
                    onOrderChange={(value) => {
                      setOrder(value);
                      setPage(1);
                    }}
                  />
                </div>

                <Filters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  activeCount={activeFilters}
                  variant="table"
                  showHeader={false}
                  onSelect={(value) => {
                    setSelectedCategory(value);
                    setPage(1);
                  }}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex-1">
                    <SearchBar
                      value={search}
                      onChange={setSearch}
                      onClear={() => setSearch("")}
                    />
                  </div>

                  <Sort
                    sortBy={sortBy}
                    order={order}
                    onSortChange={(value) => {
                      setSortBy(value);
                      setPage(1);
                    }}
                    onOrderChange={(value) => {
                      setOrder(value);
                      setPage(1);
                    }}
                  />
                </div>

                <Filters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  activeCount={activeFilters}
                  onSelect={(value) => {
                    setSelectedCategory(value);
                    setPage(1);
                  }}
                />
              </>
            )}

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {loading ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
                Loading patient directory...
              </div>
            ) : null}

            {!loading && !error && patients.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
                <p>No patients matched your current filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                    setSortBy(DEFAULT_SORT);
                    setOrder(DEFAULT_ORDER);
                    setPage(1);
                  }}
                  className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                >
                  Reset filters
                </button>
              </div>
            ) : null}

            {!loading && !error && patients.length > 0 ? (
              <>
                {viewMode === "card" ? (
                  <CardView patients={patients} />
                ) : (
                  <RowView patients={patients} />
                )}

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
