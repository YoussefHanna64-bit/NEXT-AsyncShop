import { getCartItems } from "../services/cartAPI";
import ProductCard from "./ProductCard";

function mapCartProduct(cartProduct: any) {
  return {
    id: cartProduct.id,
    title: cartProduct.title,
    description: "",
    price: cartProduct.price,
    images: [cartProduct.thumbnail],
  };
}

export default async function CartList() {
  const cartItems: any[] = await getCartItems();

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cartItems.map((item) => (
        <ProductCard key={item.id} product={mapCartProduct(item)} />
      ))}
    </div>
  );
}
