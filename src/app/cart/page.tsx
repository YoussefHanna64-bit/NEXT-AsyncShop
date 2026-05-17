import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import CartList from "../../components/cartList";

export default function Cart() {
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>
      <Suspense fallback={<Spinner />}>
        <CartList />
      </Suspense>
    </div>
  );
}
