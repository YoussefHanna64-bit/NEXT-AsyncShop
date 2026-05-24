import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  wishlistedProductIds?: number[];
}

export default function ProductList({
  products,
  wishlistedProductIds = [],
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          initialIsWished={wishlistedProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
}
