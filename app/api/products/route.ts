import { NextResponse } from "next/server";

import data from "@/data/data.json";
import type { Patient, SortField, SortOrder } from "@/types/product";

const patients = data as Patient[];
const categories = [...new Set(patients.map((item) => item.medical_issue))].sort();
const sortableFields: SortField[] = ["patient_id", "patient_name", "age"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const category = (searchParams.get("category") ?? searchParams.get("issue") ?? "")
    .trim()
    .toLowerCase();
  const sort = searchParams.get("sort") as SortField | null;
  const order: SortOrder = searchParams.get("order") === "desc" ? "desc" : "asc";

  let filtered = [...patients];

  if (search) {
    filtered = filtered.filter((item) => {
      const primaryContact = item.contact[0];

      return [
        item.patient_name,
        item.medical_issue,
        String(item.patient_id),
        primaryContact?.address ?? "",
        primaryContact?.number ?? "",
        primaryContact?.email ?? "",
      ].some((value) => value.toLowerCase().includes(search));
    });
  }

  if (category && category !== "all") {
    filtered = filtered.filter(
      (item) => item.medical_issue.toLowerCase() === category,
    );
  }

  if (sort && sortableFields.includes(sort)) {
    filtered.sort((leftItem, rightItem) => {
      const left = leftItem[sort];
      const right = rightItem[sort];

      if (typeof left === "number" && typeof right === "number") {
        return order === "desc" ? right - left : left - right;
      }

      const comparison = String(left).localeCompare(String(right));
      return order === "desc" ? comparison * -1 : comparison;
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    total,
    page: currentPage,
    limit,
    totalPages,
    categories,
  });
}