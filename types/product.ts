export interface PatientContact {
  address: string | null;
  number: string | null;
  email: string | null;
}

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: PatientContact[];
  medical_issue: string;
}

export type Product = Patient;

export type SortField = "patient_id" | "patient_name" | "age";
export type SortOrder = "asc" | "desc";
export type ViewMode = "table" | "card";

export interface ProductsResponse {
  data: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
}