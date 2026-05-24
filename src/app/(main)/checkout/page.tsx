"use client";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { placeOrder } from "@/app/actions/checkout";
import { LoaderCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    const result = await placeOrder(data, items);

    if (result.success) {
      clearCart();
      setIsSuccess(true);
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-20 text-center mt-10 bg-gray-800/40 border border-gray-800 rounded-3xl">
        <CheckCircle className="w-20 h-20 text-teal-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-white">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Thank you for shopping at AsyncShop. Your order is now being
          processed.
        </p>
        <Link
          href="/profile"
          className="bg-teal-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-teal-300 transition-colors"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 w-full mt-5">
      <h1 className="text-4xl font-bold mb-10 text-white">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3 bg-gray-800/40 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">
            Shipping Details
          </h2>

          <form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Street Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
                placeholder="123 Developer Way"
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">
                  {String(errors.address.message)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  City
                </label>
                <input
                  {...register("city", { required: true })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Zip Code
                </label>
                <input
                  {...register("zipCode", { required: true })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-800 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-400 line-clamp-1 w-2/3">
                    {item.quantity}x {item.title}
                  </span>
                  <span className="text-white font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total:</span>
                <span className="text-teal-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-teal-400 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-teal-300 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <LoaderCircle className="w-6 h-6 animate-spin" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
