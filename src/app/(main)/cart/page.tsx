import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import CartList from "@/components/CartList";

export const metadata = {
  title: "Your Cart",
};

export const dynamic = "force-dynamic";

export default async function Cart() {

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>
      <Suspense fallback={<Spinner />}>
        <CartList />
      </Suspense>
    </div>
  );
}
