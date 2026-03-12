import type { Patient, SortField, SortOrder } from "@/types/product";

export type DisplayVariant = "default" | "table";

export interface CardViewProps {
  patients: Patient[];
}

export interface RowViewProps {
  patients: Patient[];
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  variant?: DisplayVariant;
}

export interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  activeCount: number;
  onSelect: (category: string) => void;
  showHeader?: boolean;
  variant?: DisplayVariant;
}

export interface SortProps {
  sortBy: SortField;
  order: SortOrder;
  onSortChange: (value: SortField) => void;
  onOrderChange: (value: SortOrder) => void;
  variant?: DisplayVariant;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}