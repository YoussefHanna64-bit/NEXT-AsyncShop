"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import CartProductCard from "./CartProductCard";

export default function CartList() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg mb-6">Your cart is empty.</p>
        <Link
          href="/products"
          className="bg-teal-400 px-6 py-3 rounded-full font-bold hover:bg-teal-300 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <div className="w-full lg:w-2/3 space-y-4">
        {items.map((item) => (
          <CartProductCard
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}

        <button
          onClick={clearCart}
          className="text-gray-400 hover:text-white text-sm transition-colors underline pt-2 block"
        >
          Clear entire cart
        </button>
      </div>

      <div className="w-full lg:w-1/3 bg-gray-800/40 border border-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold border-b border-gray-700 pb-4">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-400">
            <span>Items count:</span>
            <span className="text-white font-medium">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Shipping:</span>
            <span className="text-teal-400 font-medium">Free</span>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-teal-400">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="block w-full text-center bg-teal-400 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-teal-300 transition-colors shadow-lg shadow-teal-400/10"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
