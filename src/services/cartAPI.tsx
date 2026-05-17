const baseURL = "https://dummyjson.com/carts/1";

export const getCart = async () => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }
  return res.json();
};

export const getCartItems = async () => {
  const cart = await getCart();
  return cart.products || [];
};
