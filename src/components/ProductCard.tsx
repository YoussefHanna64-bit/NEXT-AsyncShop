import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-teal-400 transition-colors"
    >
      <div className="relative h-64 w-full">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-teal-400 font-bold text-xl mb-4">${product.price}</p>

        <div className="text-center bg-gray-700 py-3 rounded-full group-hover:bg-teal-400 group-hover:text-gray-900 transition-colors font-medium">
          View Details
        </div>
      </div>
    </Link>
  );
}
