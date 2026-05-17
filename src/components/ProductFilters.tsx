"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const priceOptions = [
  { label: "All Prices", value: Infinity },
  { label: "Under $5", value: 5 },
  { label: "Under $20", value: 20 },
  { label: "Under $50", value: 50 },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentPrice = searchParams.get("price") || "Infinity";

  const [search, setSearch] = useState(currentSearch);

  const updateUrl = (newSearch: string, newPrice: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);

    if (newPrice !== "Infinity") {
      params.set("price", newPrice);
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    updateUrl(newValue, currentPrice);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between"
    >
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        className="bg-gray-800 text-white border border-gray-700 focus:border-teal-400 px-4 py-3 rounded-lg w-full md:w-1/2 outline-none transition-colors"
      />

      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
        {priceOptions.map(({ label, value }) => {
          const isActive = currentPrice === value.toString();
          return (
            <button
              key={label}
              type="button"
              onClick={() => updateUrl(search, value.toString())}
              className={`px-4 py-2 rounded-lg border transition-colors font-semibold ${
                isActive
                  ? "bg-teal-400 text-gray-900 border-teal-400"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:border-teal-400"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </form>
  );
}
