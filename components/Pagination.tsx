"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4"
    >
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span aria-live="polite" className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
