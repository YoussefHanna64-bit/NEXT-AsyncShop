import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products",
  description: "Products",
};

const productsList = [
  {
    id: "1",
    title: "Wireless Headphones",
    price: 199.99,
    image: "/bg-home.jpg",
  },
  {
    id: "2",
    title: "Mechanical Keyboard",
    price: 120.5,
    image: "/bg-home.jpg",
  },
  {
    id: "3",
    title: "Gaming Mouse",
    price: 65.0,
    image: "/bg-home.jpg",
  },
  {
    id: "4",
    title: "Wireless Headphones",
    price: 199.99,
    image: "/bg-home.jpg",
  },
  {
    id: "5",
    title: "Mechanical Keyboard",
    price: 120.5,
    image: "/bg-home.jpg",
  },
  {
    id: "6",
    title: "Gaming Mouse",
    price: 65.0,
    image: "/bg-home.jpg",
  },
];

export default function ProductsPage() {
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>
      <ProductList products={productsList} />
    </div>
  );
}
