import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import { getAllProducts } from "@/services/productsAPI";

export const metadata = {
  title: "Products",
  description: "Products",
};

export const revalidate = 20;

interface Props {
  searchParams: Promise<{
    search?: string;
    price?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllProducts();
  let products = data.products || [];

  const search = (params.search || "").toLowerCase();
  const price = params.price ? Number(params.price) : Infinity;

  products = products.filter(
    (p: any) =>
      p.title.toLowerCase().includes(search) &&
      (price === Infinity || p.price <= price),
  );

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>

      <ProductFilters />

      {products.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl text-white font-bold mb-4">
            No Products Found
          </h2>
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
