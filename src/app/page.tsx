import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-25">
      <Image
        src="/bg-home.jpg"
        alt="hero"
        fill
        className="object-cover brightness-50 -z-10"
      />
      <div className="text-center">
        <h1 className="text-6xl text-primary-50 mb-10 font-normal text-white">
          Welcome to AsyncShop
        </h1>
        <Link
          href="/products"
          className="bg-teal-400 px-5 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all rounded-full"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
