"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (newSortValue) {
      params.set("sort", newSortValue);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-gray-400 text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block p-2.5 outline-none transition-colors"
      >
        <option value="">Default (Relevance)</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
