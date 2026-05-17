import ProductList from "@/components/ProductList";
import { getProductsByCategory } from "@/services/productsAPI";

interface Props {
  params: Promise<{
    categoryName: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { categoryName } = await params;
  return {
    title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoryName } = await params;
  const data = await getProductsByCategory(categoryName);
  const products = data.products || [];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 capitalize text-teal-400">
        {categoryName}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-400 text-xl">
          No products found in this category.
        </p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
