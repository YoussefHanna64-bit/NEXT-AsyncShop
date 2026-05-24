"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import WishlistButton from "./WishlistButton";

interface Props {
  product: Product;
  showWishlistButton?: boolean;
  initialIsWished?: boolean;
}

export default function AddToCartSection({
  product,
  showWishlistButton = false,
  initialIsWished = false,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    const image = product.images?.[0];

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image,
      quantity,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 font-medium">Quantity:</span>
        <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800">
          <button
            type="button"
            onClick={handleDecrease}
            className="px-4 py-2 hover:text-teal-400 transition-colors text-xl font-bold"
          >
            -
          </button>
          <span className="px-4 py-2 font-semibold w-12 text-center border-x border-gray-700">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="px-4 py-2 hover:text-teal-400 transition-colors text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleAdd}
          className="w-full rounded-full bg-teal-400 px-8 py-4 text-lg font-bold text-gray-900 transition-colors hover:bg-teal-300 sm:flex-1"
        >
          Add to Cart
        </button>

        {showWishlistButton && (
          <WishlistButton
            productId={product.id}
            initialIsWished={initialIsWished}
            variant="secondary"
            className="w-full sm:w-auto"
          />
        )}
      </div>
    </div>
  );
}
