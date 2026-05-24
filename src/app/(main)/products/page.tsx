import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import { getAllProducts } from "@/services/productsAPI";
import { getCurrentUserWishlistIds } from "@/services/wishlist";
import SortDropdown from "@/components/SortDropdown";

export const metadata = {
  title: "Products",
  description: "Products",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    search?: string;
    price?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllProducts();
  const wishlistedProductIds = await getCurrentUserWishlistIds();
  let products = data.products || [];

  const search = (params.search || "").toLowerCase();
  const price = params.price ? Number(params.price) : Infinity;
  const sort = params.sort || "";

  products = products.filter(
    (p: any) =>
      p.title.toLowerCase().includes(search) &&
      (price === Infinity || p.price <= price),
  );

  if (sort === "price_asc") {
    products.sort((a: any, b: any) => a.price - b.price);
  } else if (sort === "price_desc") {
    products.sort((a: any, b: any) => b.price - a.price);
  }

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>

      <div className="flex flex-row items-center justify-between gap-4 mb-8 flex-wrap">
        <ProductFilters />
        <SortDropdown />
      </div>

      {products.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl text-white font-bold mb-4">
            No Products Found
          </h2>
        </div>
      ) : (
        <ProductList
          products={products}
          wishlistedProductIds={wishlistedProductIds}
        />
      )}
    </div>
  );
}
