const baseURL = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const getProductById = async (id: number) => {
  const res = await fetch(`${baseURL}/${id}`);
  console.log(res);
  if (!res.ok) {
    throw new Error(`Failed to fetch product`);
  }
  return res.json();
};
