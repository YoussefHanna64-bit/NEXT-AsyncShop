"use client";
import Image from "next/image";
import { CartItem } from "@/types/CartItem";

interface Props {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartProductCard({
  item,
  updateQuantity,
  removeFromCart,
}: Props) {
  return (
    <div className="flex items-center justify-between bg-gray-800/50 border border-gray-800 p-4 rounded-xl gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image as string}
            alt={item.title}
            fill
            className="object-contain p-2"
          />
        </div>
        <div>
          <h3 className="font-semibold text-xl text-white line-clamp-1">
            {item.title}
          </h3>
          <p className="text-teal-400 font-medium">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center border border-gray-700 rounded-lg bg-gray-900">
          <button
            onClick={() =>
              item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
            }
            className="px-3 py-1 hover:text-teal-400 font-bold"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-semibold border-x border-gray-700 w-10 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 hover:text-teal-400 font-bold"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
