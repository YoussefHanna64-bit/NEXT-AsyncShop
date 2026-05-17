import Link from "next/link";

const categories = [
  { name: "Smartphones", slug: "smartphones" },
  { name: "Laptops", slug: "laptops" },
  { name: "Mobile Accessories", slug: "mobile-accessories" },
  { name: "Tablets", slug: "tablets" },
  { name: "Vehicle", slug: "vehicle" },
];

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-10 w-full mt-5">
      <aside className="w-full md:w-1/4">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
          Browse Categories
        </h2>
        <nav className="flex flex-col">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="text-gray-300 hover:text-teal-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="w-full md:w-3/4">{children}</main>
    </div>
  );
}
