"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings
      </label>
      <input
        id="meeting-search"
        type="search"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
