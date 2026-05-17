import ProductList from "@/components/ProductList";
import { getAllProducts } from "@/services/productsAPI";

export const metadata = {
  title: "Products",
  description: "Products",
};

export const revalidate = 20;

export default async function ProductsPage() {
  const data = await getAllProducts();
  const products = data.products || [];

  if (products.length === 0) {
    return (
      <div className="m-10">
        <h1 className="text-4xl font-bold mb-10 text-center">No Products Found</h1>
      </div>
    );
  }
  
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}
