import Image from "next/image";

interface Props {
  params: {
    productId: string;
  };
}

function getProduct(id: string) {
  return {
    id,
    title: "Wireless Headphones",
    price: 199.99,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/bg-home.jpg",
  };
}
export async function generateMetadata({ params }: Props) {
  const { productId } = await params;
  const product = await getProduct(productId);
  return {
    title: product.title,
  };
}

export default async function ProductDetails({ params }: Props) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 mt-10">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/2 relative h-100 rounded-lg overflow-hidden border border-gray-800">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl text-teal-400 font-semibold mb-6">
            ${product.price}
          </p>

          <p className="text-gray-300 mb-10 text-lg">{product.description}</p>

          <button className="bg-teal-400 px-8 py-4 text-gray-900 text-lg font-bold hover:bg-teal-300 transition-colors rounded-full w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
