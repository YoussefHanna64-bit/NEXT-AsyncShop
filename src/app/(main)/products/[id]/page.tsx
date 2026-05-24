import AddToCartSection from "@/components/AddToCart";
import ExpandableText from "@/components/ExpandableText";
import { getProductById } from "@/services/productsAPI";
import { getCurrentUserWishlistIds } from "@/services/wishlist";
import Image from "next/image";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);
  return {
    title: product.title,
  };
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  const wishlistedProductIds = await getCurrentUserWishlistIds();

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 mt-10">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/2 relative h-100 rounded-lg overflow-hidden border border-gray-800">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl text-teal-400 font-semibold mb-6">
            ${product.price}
          </p>

          <ExpandableText text={product.description} />
          <AddToCartSection
            product={product}
            showWishlistButton
            initialIsWished={wishlistedProductIds.includes(product.id)}
          />
        </div>
      </div>
    </div>
  );
}
